// רשימה מקובצת לפי מצב/שיוך — מציגה למטה איזה פריט שייך לאיזו קבוצה
export default function Breakdown({ icon = '📋', title, subtitle, groups }) {
  return (
    <section className="breakdown">
      <div className="cat-head">
        <div className="cat-ic">{icon}</div>
        <div className="t">
          <h3>{title}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>

      <div className="breakdown-grid">
        {groups.map((g) => (
          <div key={g.key} className={'bd-col ' + (g.cls || '')}>
            <div className="bd-col-head">
              <span>{g.emoji} {g.label}</span>
              <b>{g.items.length}</b>
            </div>
            {g.items.length === 0 ? (
              <div className="bd-empty">— אין פריטים —</div>
            ) : (
              <ul>
                {g.items.map((it) => (
                  <li key={it.id}>
                    <span className="bd-em">{it.emoji || '📌'}</span>
                    <span className="bd-label">{it.label}</span>
                    {it.note && it.note.trim() && (
                      <span className="bd-note">{it.note.trim()}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
