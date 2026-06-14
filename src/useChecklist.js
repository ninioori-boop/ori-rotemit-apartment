import { useState, useEffect, useCallback, useRef } from 'react'
import { onSnapshot, setDoc } from 'firebase/firestore'
import { SCHEDULE_SEED } from './data.js'
import { sharedDoc } from './firebase.js'

const KEY = 'move-checklist-react-v1'

const cloneSeed = () => SCHEDULE_SEED.map((s) => ({ ...s }))

function initialState() {
  return { status: {}, notes: {}, custom: {}, moveStatus: {}, moveCustom: [], schedule: cloneSeed() }
}

// מנרמל אובייקט נתונים גולמי (מ-localStorage או מ-Firestore) למבנה התקין
function normalize(s) {
  if (!s || typeof s !== 'object') return initialState()
  return {
    status: s.status || {},
    notes: s.notes || {},
    custom: s.custom || {},
    moveStatus: s.moveStatus || {},
    moveCustom: s.moveCustom || [],
    // schedule שלא קיים כלל => משתמשים בשלבים המוצעים; רשימה ריקה נשמרת כפי שהיא
    schedule: s.schedule === undefined ? cloneSeed() : s.schedule,
  }
}

// טעינה ראשונית מהיר מ-localStorage (תצוגה מיידית עד שמגיע המידע מהענן)
function loadLocal() {
  try {
    return normalize(JSON.parse(localStorage.getItem(KEY)))
  } catch (e) {
    return initialState()
  }
}

let counter = 0
const uid = (p) => `${p}${Date.now()}_${counter++}`

export function useChecklist() {
  const [state, setState] = useState(loadLocal)
  // האם התקבל כבר העדכון הראשון מהענן (מונע דריסה של נתוני הענן לפני שהגיעו)
  const [ready, setReady] = useState(false)
  // דגל שמסמן שהשינוי הנוכחי הגיע מהענן — כדי לא לכתוב אותו בחזרה (מניעת לולאה)
  const fromRemote = useRef(false)

  // האזנה בזמן אמת לשינויים מהענן (גם של רותם וגם שלך ממכשירים אחרים)
  useEffect(() => {
    const unsub = onSnapshot(
      sharedDoc,
      (snap) => {
        if (snap.exists()) {
          fromRemote.current = true
          setState(normalize(snap.data()))
        }
        // אם המסמך עדיין לא קיים — נשאיר את המצב המקומי, וה-effect הבא ייצור אותו בענן
        setReady(true)
      },
      (err) => {
        console.error('Firestore listen error:', err)
        setReady(true)
      },
    )
    return unsub
  }, [])

  // כתיבה לענן (ול-localStorage כגיבוי) בכל שינוי מקומי
  useEffect(() => {
    // תמיד שומרים עותק מקומי לטעינה מהירה בפעם הבאה
    try { localStorage.setItem(KEY, JSON.stringify(state)) } catch (e) { /* ignore */ }

    // לא כותבים לענן לפני שקיבלנו את העדכון הראשון משם
    if (!ready) return
    // אם השינוי הגיע מהענן — לא כותבים אותו בחזרה
    if (fromRemote.current) { fromRemote.current = false; return }

    // השהיה קצרה כדי לקבץ שינויים מהירים (למשל הקלדת הערה) לכתיבה אחת
    const id = setTimeout(() => {
      setDoc(sharedDoc, state).catch((e) => console.error('Firestore write error:', e))
    }, 400)
    return () => clearTimeout(id)
  }, [state, ready])

  // ----- מסך המשימות -----
  const setStatus = useCallback((id, val) => {
    setState((s) => {
      const status = { ...s.status }
      if (status[id] === val) delete status[id]; else status[id] = val
      return { ...s, status }
    })
  }, [])

  const setNote = useCallback((id, text) => {
    setState((s) => ({ ...s, notes: { ...s.notes, [id]: text } }))
  }, [])

  const addTask = useCallback((catId, label) => {
    const clean = label.trim(); if (!clean) return
    setState((s) => {
      const list = s.custom[catId] ? [...s.custom[catId]] : []
      list.push({ id: uid('c'), emoji: '📌', label: clean, custom: true })
      return { ...s, custom: { ...s.custom, [catId]: list } }
    })
  }, [])

  const removeTask = useCallback((catId, id) => {
    setState((s) => {
      const list = (s.custom[catId] || []).filter((t) => t.id !== id)
      const status = { ...s.status }; delete status[id]
      const notes = { ...s.notes }; delete notes[id]
      return { ...s, custom: { ...s.custom, [catId]: list }, status, notes }
    })
  }, [])

  // ----- מסך ההובלה -----
  const setMoveStatus = useCallback((id, val) => {
    setState((s) => {
      const moveStatus = { ...s.moveStatus }
      if (moveStatus[id] === val) delete moveStatus[id]; else moveStatus[id] = val
      return { ...s, moveStatus }
    })
  }, [])

  const addMoveItem = useCallback((label) => {
    const clean = label.trim(); if (!clean) return
    setState((s) => ({
      ...s,
      moveCustom: [...s.moveCustom, { id: uid('cmv'), emoji: '📦', label: clean, custom: true }],
    }))
  }, [])

  const removeMoveItem = useCallback((id) => {
    setState((s) => {
      const moveStatus = { ...s.moveStatus }; delete moveStatus[id]
      const notes = { ...s.notes }; delete notes[id]
      return { ...s, moveCustom: s.moveCustom.filter((t) => t.id !== id), moveStatus, notes }
    })
  }, [])

  // ----- מסך הלו"ז -----
  const addSchedule = useCallback((date, title) => {
    const clean = title.trim(); if (!clean) return
    setState((s) => ({ ...s, schedule: [...s.schedule, { id: uid('sch'), date: date || '', title: clean, done: false }] }))
  }, [])

  const updateSchedule = useCallback((id, patch) => {
    setState((s) => ({ ...s, schedule: s.schedule.map((it) => (it.id === id ? { ...it, ...patch } : it)) }))
  }, [])

  const removeSchedule = useCallback((id) => {
    setState((s) => ({ ...s, schedule: s.schedule.filter((it) => it.id !== id) }))
  }, [])

  const reset = useCallback(() => setState(initialState()), [])

  return {
    state,
    setStatus, setNote, addTask, removeTask,
    setMoveStatus, addMoveItem, removeMoveItem,
    addSchedule, updateSchedule, removeSchedule,
    reset,
  }
}
