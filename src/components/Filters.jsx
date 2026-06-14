const FILTERS = [
  { id: 'all', label: 'הכל' },
  { id: 'todo', label: 'נשאר לעשות' },
  { id: 'uri', label: '👨 אורי' },
  { id: 'rotem', label: '👩 רותם' },
  { id: 'done', label: 'הושלם' },
]

export default function Filters({ current, onChange, onReset }) {
  return (
    <div className="filters">
      {FILTERS.map((f) => (
        <button
          key={f.id}
          className={current === f.id ? 'active' : ''}
          onClick={() => onChange(f.id)}
        >
          {f.label}
        </button>
      ))}
      <span className="spacer" />
      <button className="ghost" onClick={onReset}>איפוס הכל ↺</button>
    </div>
  )
}
