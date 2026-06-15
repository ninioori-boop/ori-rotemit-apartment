import { useState, useEffect, useMemo, useRef } from 'react'
import { CATEGORIES } from './data.js'
import { useChecklist } from './useChecklist.js'
import { bigConfetti } from './confetti.js'
import Header from './components/Header.jsx'
import Tabs from './components/Tabs.jsx'
import Overview from './components/Overview.jsx'
import Filters from './components/Filters.jsx'
import CategoryCard from './components/CategoryCard.jsx'
import MovingView from './components/MovingView.jsx'
import ScheduleView from './components/ScheduleView.jsx'
import Breakdown from './components/Breakdown.jsx'

export default function App() {
  const cl = useChecklist()
  const { state } = cl
  const [tab, setTab] = useState('tasks')
  const [filter, setFilter] = useState('all')

  // משלב משימות בסיס + משימות מותאמות לכל קטגוריה
  const merged = useMemo(
    () => CATEGORIES.map((c) => ({
      category: c,
      tasks: [...c.tasks, ...(state.custom[c.id] || [])],
    })),
    [state.custom]
  )

  const all = merged.flatMap((m) => m.tasks)
  const total = all.length
  const done = all.filter((t) => state.status[t.id] === 'done').length
  const uriOpen = all.filter((t) => state.status[t.id] === 'uri').length
  const rotemOpen = all.filter((t) => state.status[t.id] === 'rotem').length
  const unassigned = all.filter((t) => !state.status[t.id]).length

  // קיבוץ המשימות לפי שיוך — לרשימה המסכמת בתחתית מסך המשימות
  const taskGroup = (key) =>
    all
      .filter((t) => state.status[t.id] === key)
      .map((t) => ({ ...t, note: state.notes[t.id] || '' }))

  const taskGroups = [
    { key: 'uri', label: 'אורי', emoji: '👨', cls: 'uri', items: taskGroup('uri') },
    { key: 'rotem', label: 'רותם', emoji: '👩', cls: 'rotem', items: taskGroup('rotem') },
    { key: 'done', label: 'הושלם', emoji: '✅', cls: 'done', items: taskGroup('done') },
  ]

  // קונפטי גדול כשמסיימים את כל המשימות
  const celebrated = useRef(false)
  useEffect(() => {
    const finished = total > 0 && done === total
    if (finished && !celebrated.current) { celebrated.current = true; bigConfetti() }
    if (!finished) celebrated.current = false
  }, [done, total])

  const handleReset = () => {
    if (window.confirm('לאפס את הכל (משימות, לו״ז והובלה) למצב ההתחלתי?')) cl.reset()
  }

  return (
    <div className="wrap">
      <Header />
      <Tabs active={tab} onChange={setTab} />

      {tab === 'tasks' && (
        <>
          <Overview
            done={done} total={total}
            uriOpen={uriOpen} rotemOpen={rotemOpen} unassigned={unassigned}
          />
          <Filters current={filter} onChange={setFilter} onReset={handleReset} />
          <div id="board">
            {merged.map(({ category, tasks }) => (
              <CategoryCard
                key={category.id}
                category={category}
                tasks={tasks}
                filter={filter}
                state={state}
                onStatus={cl.setStatus}
                onNote={cl.setNote}
                onAdd={cl.addTask}
                onRemove={cl.removeTask}
              />
            ))}
          </div>

          <Breakdown
            icon="🧑‍🤝‍🧑"
            title="חלוקת המשימות"
            subtitle="מה על אורי, מה על רותם ומה כבר הושלם"
            groups={taskGroups}
          />
        </>
      )}

      {tab === 'schedule' && (
        <ScheduleView
          schedule={state.schedule}
          onAdd={cl.addSchedule}
          onUpdate={cl.updateSchedule}
          onRemove={cl.removeSchedule}
        />
      )}

      {tab === 'moving' && (
        <MovingView
          state={state}
          onStatus={cl.setMoveStatus}
          onNote={cl.setNote}
          onAdd={cl.addMoveItem}
          onRemove={cl.removeMoveItem}
        />
      )}

      <footer>
        נבנה באהבה לאורי ורותמית · ההתקדמות נשמרת אוטומטית במכשיר הזה<br />
        <span className="flag">🇦🇷</span>
      </footer>
    </div>
  )
}
