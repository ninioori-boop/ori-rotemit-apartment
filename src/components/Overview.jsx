const CIRC = 2 * Math.PI * 50

export default function Overview({ done, total, uriOpen, rotemOpen, unassigned }) {
  const pct = total ? Math.round((done / total) * 100) : 0
  const finished = total > 0 && done === total

  return (
    <section className="overview">
      <div className="ring">
        <svg width="118" height="118" viewBox="0 0 118 118">
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#75AADB" />
              <stop offset="100%" stopColor="#F6B40E" />
            </linearGradient>
          </defs>
          <circle className="track" cx="59" cy="59" r="50" fill="none" strokeWidth="12" />
          <circle
            className="fill" cx="59" cy="59" r="50" fill="none" strokeWidth="12"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC - (pct / 100) * CIRC}
          />
          <text
            className="pct" x="59" y="59" textAnchor="middle"
            dominantBaseline="central" transform="rotate(90 59 59)"
          >
            {pct}%
          </text>
        </svg>
      </div>

      <div className="meta">
        <h2>ההתקדמות שלנו 🚚</h2>
        <p>{total ? `הושלמו ${done} מתוך ${total} משימות · נשארו ${total - done}` : 'בואו נתחיל!'}</p>

        <div className="bigbar"><i style={{ width: pct + '%' }} /></div>

        <div className="owner-stats">
          <span className="chip uri">👨 אורי <b>{uriOpen}</b></span>
          <span className="chip rotem">👩 רותם <b>{rotemOpen}</b></span>
          <span className="chip">⚪ לא משויך <b>{unassigned}</b></span>
        </div>

        {finished && (
          <p className="done-msg show">🎉 מזל טוב! סיימתם את כל המשימות. ברוכים הבאים הביתה!</p>
        )}
      </div>
    </section>
  )
}
