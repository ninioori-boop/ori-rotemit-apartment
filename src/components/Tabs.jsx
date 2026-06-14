const TABS = [
  { id: 'tasks', label: 'משימות', emoji: '📋' },
  { id: 'schedule', label: 'לו״ז', emoji: '🗓️' },
  { id: 'moving', label: 'הובלה', emoji: '🚚' },
]

export default function Tabs({ active, onChange }) {
  return (
    <nav className="tabs">
      {TABS.map((t) => (
        <button
          key={t.id}
          className={active === t.id ? 'active' : ''}
          onClick={() => onChange(t.id)}
        >
          <span className="tab-emoji">{t.emoji}</span> {t.label}
        </button>
      ))}
    </nav>
  )
}
