import { useState } from 'react'
import { MOVING_ITEMS, MOVE_OPTIONS } from '../data.js'
import TaskRow from './TaskRow.jsx'

const FILTERS = [
  { id: 'all', label: 'הכל' },
  { id: 'gindi', label: '🏠 גינדי' },
  { id: 'kingeorge', label: "🏛️ קינג ג'ורג'" },
  { id: 'buy', label: '🛒 לקנות' },
  { id: 'none', label: 'לא סומן' },
]

export default function MovingView({ state, onStatus, onNote, onAdd, onRemove }) {
  const [draft, setDraft] = useState('')
  const [filter, setFilter] = useState('all')

  const items = [...MOVING_ITEMS, ...state.moveCustom]
  const stOf = (id) => state.moveStatus[id] || ''

  const gindi = items.filter((t) => stOf(t.id) === 'gindi').length
  const king = items.filter((t) => stOf(t.id) === 'kingeorge').length
  const buy = items.filter((t) => stOf(t.id) === 'buy').length
  const none = items.filter((t) => !stOf(t.id)).length

  const passes = (t) => {
    const st = stOf(t.id)
    if (filter === 'all') return true
    if (filter === 'none') return !st
    return st === filter
  }
  const visible = items.filter(passes)

  const submit = () => { onAdd(draft); setDraft('') }

  return (
    <section className="cat">
      <div className="cat-head">
        <div className="cat-ic">🚚</div>
        <div className="t">
          <h3>הובלה</h3>
          <p>לכל מוצר — מאיפה הוא מגיע, או אם צריך לקנות</p>
        </div>
      </div>

      <div className="move-summary">
        <span className="chip gindi">🏠 גינדי <b>{gindi}</b></span>
        <span className="chip king">🏛️ קינג ג'ורג' <b>{king}</b></span>
        <span className="chip buy">🛒 לקנות <b>{buy}</b></span>
        <span className="chip">⚪ לא סומן <b>{none}</b></span>
      </div>

      <div className="filters inner">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={filter === f.id ? 'active' : ''}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="tasks">
        {visible.map((t) => (
          <TaskRow
            key={t.id}
            task={t}
            status={stOf(t.id)}
            note={state.notes[t.id] || ''}
            options={MOVE_OPTIONS}
            confettiKey={null}
            onStatus={onStatus}
            onNote={onNote}
            onRemove={onRemove}
          />
        ))}
      </ul>

      {visible.length === 0 && (
        <div className="empty-hint" style={{ display: 'block' }}>אין מוצרים להצגה בסינון הזה</div>
      )}

      <div className="add-row">
        <input
          type="text"
          placeholder="הוספת מוצר חדש…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
        />
        <button onClick={submit}>＋ הוספה</button>
      </div>
    </section>
  )
}
