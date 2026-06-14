import { useState } from 'react'

const CHECK = (
  <svg viewBox="0 0 24 24"><polyline points="4,12 10,18 20,6" /></svg>
)

export default function ScheduleView({ schedule, onAdd, onUpdate, onRemove }) {
  const [date, setDate] = useState('')
  const [title, setTitle] = useState('')

  // ממוין: עם תאריך לפי סדר עולה, ואחר כך ללא תאריך
  const sorted = [...schedule].sort((a, b) => {
    if (a.date && b.date) return a.date < b.date ? -1 : a.date > b.date ? 1 : 0
    if (a.date) return -1
    if (b.date) return 1
    return 0
  })

  const doneCount = schedule.filter((s) => s.done).length

  const submit = () => { onAdd(date, title); setDate(''); setTitle('') }

  return (
    <section className="cat">
      <div className="cat-head">
        <div className="cat-ic">🗓️</div>
        <div className="t">
          <h3>לו״ז לקראת המעבר</h3>
          <p>ציר הזמן של השלבים החשובים</p>
        </div>
        <div className="cat-count">{doneCount}/{schedule.length}</div>
      </div>

      <ul className="timeline">
        {sorted.map((it) => (
          <li key={it.id} className={'sched-row' + (it.done ? ' done' : '')}>
            <button
              className="mini-check"
              title="סומן כבוצע"
              onClick={() => onUpdate(it.id, { done: !it.done })}
            >
              {CHECK}
            </button>

            <input
              type="date"
              className="sched-date-input"
              value={it.date || ''}
              onChange={(e) => onUpdate(it.id, { date: e.target.value })}
            />

            <input
              className="sched-title-input"
              value={it.title}
              onChange={(e) => onUpdate(it.id, { title: e.target.value })}
            />

            <button className="icon-btn del" title="מחיקה" onClick={() => onRemove(it.id)}>🗑️</button>
          </li>
        ))}
      </ul>

      {schedule.length === 0 && (
        <div className="empty-hint" style={{ display: 'block' }}>עדיין אין שלבים — הוסיפו את הראשון 👇</div>
      )}

      <div className="sched-add">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input
          type="text"
          placeholder="שלב חדש בלו״ז…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
        />
        <button onClick={submit}>＋ הוספה</button>
      </div>
    </section>
  )
}
