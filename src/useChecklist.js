import { useState, useEffect, useCallback } from 'react'
import { SCHEDULE_SEED } from './data.js'

const KEY = 'move-checklist-react-v1'

const cloneSeed = () => SCHEDULE_SEED.map((s) => ({ ...s }))

function initialState() {
  return { status: {}, notes: {}, custom: {}, moveStatus: {}, moveCustom: [], schedule: cloneSeed() }
}

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY))
    if (s && typeof s === 'object') {
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
  } catch (e) { /* ignore */ }
  return initialState()
}

let counter = 0
const uid = (p) => `${p}${Date.now()}_${counter++}`

export function useChecklist() {
  const [state, setState] = useState(load)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)) } catch (e) { /* ignore */ }
  }, [state])

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
