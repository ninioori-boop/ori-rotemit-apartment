import { useState } from 'react'
import TaskRow from './TaskRow.jsx'

export default function CategoryCard({ category, tasks, filter, search = '', state, onStatus, onNote, onAdd, onRemove }) {
  const [draft, setDraft] = useState('')

  const doneCount = tasks.filter((t) => state.status[t.id] === 'done').length

  const q = search.trim().toLowerCase()
  const passes = (t) => {
    if (q && !t.label.toLowerCase().includes(q)) return false
    const st = state.status[t.id] || ''
    if (filter === 'todo') return st !== 'done'
    if (filter === 'done') return st === 'done'
    if (filter === 'uri') return st === 'uri'
    if (filter === 'rotem') return st === 'rotem'
    return true
  }
  const visible = tasks.filter(passes)

  // בזמן חיפוש — להציג רק קטגוריות שיש בהן תוצאה
  if (q && visible.length === 0) return null

  const submit = () => { onAdd(category.id, draft); setDraft('') }

  return (
    <section className="cat">
      <div className="cat-head">
        <div className="cat-ic">{category.icon}</div>
        <div className="t">
          <h3>{category.title}</h3>
          <p>{category.desc}</p>
        </div>
        <div className="cat-count">{doneCount}/{tasks.length}</div>
      </div>

      <div className="cat-bar">
        <i style={{ width: (tasks.length ? (doneCount / tasks.length) * 100 : 0) + '%' }} />
      </div>

      <ul className="tasks">
        {visible.map((t) => (
          <TaskRow
            key={t.id}
            task={t}
            status={state.status[t.id] || ''}
            note={state.notes[t.id] || ''}
            query={search.trim()}
            onStatus={onStatus}
            onNote={onNote}
            onRemove={(id) => onRemove(category.id, id)}
          />
        ))}
      </ul>

      {visible.length === 0 && (
        <div className="empty-hint" style={{ display: 'block' }}>
          {filter === 'done' ? 'עוד לא הושלמו משימות כאן' : 'אין משימות להצגה בקטגוריה הזו'}
        </div>
      )}

      <div className="add-row">
        <input
          type="text"
          placeholder="הוספת משימה משלכם…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
        />
        <button onClick={submit}>＋ הוספה</button>
      </div>
    </section>
  )
}
