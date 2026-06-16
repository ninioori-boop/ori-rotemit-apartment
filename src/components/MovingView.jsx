import { useState } from 'react'
import { MOVING_ITEMS, MOVE_OPTIONS } from '../data.js'
import TaskRow from './TaskRow.jsx'
import Breakdown from './Breakdown.jsx'
import SearchBar from './SearchBar.jsx'

const FILTERS = [
  { id: 'all', label: 'הכל' },
  { id: 'tenant', label: '🔑 מהדיירת' },
  { id: 'gindi', label: '🏠 גינדי' },
  { id: 'kingeorge', label: "🏛️ קינג ג'ורג'" },
  { id: 'buy', label: '🛒 לקנות' },
  { id: 'none', label: 'לא סומן' },
]

export default function MovingView({ state, onStatus, onNote, onAdd, onRemove }) {
  const [draft, setDraft] = useState('')
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  const items = [...MOVING_ITEMS, ...state.moveCustom]
  const stOf = (id) => state.moveStatus[id] || ''

  const tenant = items.filter((t) => stOf(t.id) === 'tenant').length
  const gindi = items.filter((t) => stOf(t.id) === 'gindi').length
  const king = items.filter((t) => stOf(t.id) === 'kingeorge').length
  const buy = items.filter((t) => stOf(t.id) === 'buy').length
  const none = items.filter((t) => !stOf(t.id)).length

  // קיבוץ המוצרים לפי מצב — לרשימה המסכמת בתחתית
  const inGroup = (key) =>
    items
      .filter((t) => stOf(t.id) === key)
      .map((t) => ({ ...t, note: state.notes[t.id] || '' }))

  const groups = [
    { key: 'tenant', label: 'מהדיירת', emoji: '🔑', cls: 'tenant', items: inGroup('tenant') },
    { key: 'buy', label: 'לקנות', emoji: '🛒', cls: 'buy', items: inGroup('buy') },
    { key: 'gindi', label: 'מגינדי', emoji: '🏠', cls: 'gindi', items: inGroup('gindi') },
    { key: 'kingeorge', label: "מקינג ג'ורג'", emoji: '🏛️', cls: 'king', items: inGroup('kingeorge') },
  ]

  const q = query.trim().toLowerCase()
  const passes = (t) => {
    if (q && !t.label.toLowerCase().includes(q)) return false
    const st = stOf(t.id)
    if (filter === 'all') return true
    if (filter === 'none') return !st
    return st === filter
  }
  const visible = items.filter(passes)

  const submit = () => { onAdd(draft); setDraft('') }

  return (
    <>
    <section className="cat">
      <div className="cat-head">
        <div className="cat-ic">🚚</div>
        <div className="t">
          <h3>הובלה</h3>
          <p>לכל מוצר — מאיפה הוא מגיע, או אם צריך לקנות</p>
        </div>
      </div>

      <div className="move-summary">
        <span className="chip tenant">🔑 מהדיירת <b>{tenant}</b></span>
        <span className="chip gindi">🏠 גינדי <b>{gindi}</b></span>
        <span className="chip king">🏛️ קינג ג'ורג' <b>{king}</b></span>
        <span className="chip buy">🛒 לקנות <b>{buy}</b></span>
        <span className="chip">⚪ לא סומן <b>{none}</b></span>
      </div>

      <div className="search-wrap">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="חיפוש מוצר… (למשל: ספה, מקרר, וילון)"
        />
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
            query={query.trim()}
            options={MOVE_OPTIONS}
            confettiKey={null}
            onStatus={onStatus}
            onNote={onNote}
            onRemove={onRemove}
          />
        ))}
      </ul>

      {visible.length === 0 && (
        <div className="empty-hint" style={{ display: 'block' }}>
          {q ? `לא נמצאו מוצרים שמתאימים ל"${query.trim()}"` : 'אין מוצרים להצגה בסינון הזה'}
        </div>
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

    <Breakdown
      icon="🗂️"
      title="סיכום לפי מקור"
      subtitle="איזה מוצר מגיע מאיפה — מהדיירת, לקנות, מגינדי או מקינג ג'ורג'"
      groups={groups}
    />
    </>
  )
}
