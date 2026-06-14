import { useState } from 'react'
import { OWNERS } from '../data.js'
import { burstAt } from '../confetti.js'

export default function TaskRow({
  task, status, note,
  options = OWNERS, confettiKey = 'done',
  onStatus, onNote, onRemove,
}) {
  const hasNote = !!(note && note.trim())
  const [showNote, setShowNote] = useState(hasNote)

  const rowCls = (options[status] && options[status].rowCls) || ''
  const rowClass = 'task' + (rowCls ? ' ' + rowCls : '')

  const handle = (val, e) => {
    onStatus(task.id, val)
    if (val === confettiKey && status !== confettiKey) burstAt(e.currentTarget)
  }

  return (
    <li className={rowClass}>
      <div className="body">
        <div className="label">
          <span className="emoji">{task.emoji || '📌'}</span>
          <span>{task.label}</span>
        </div>
        {task.detail && <div className="detail">{task.detail}</div>}

        <div className="seg">
          {Object.entries(options).map(([key, o]) => (
            <button
              key={key}
              className={status === key ? o.cls : ''}
              onClick={(e) => handle(key, e)}
            >
              {o.emoji} {o.label}
            </button>
          ))}
        </div>

        {showNote && (
          <div className="note show">
            <input
              type="text"
              placeholder="הערה (מחיר, חנות, פרטים…)"
              value={note || ''}
              autoFocus={!hasNote}
              onChange={(e) => onNote(task.id, e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="actions">
        <button
          className={'icon-btn note-btn' + (hasNote ? ' has-note' : '')}
          title="הערה"
          onClick={() => setShowNote((v) => !v)}
        >
          📝<span className="note-dot" />
        </button>
        {task.custom && (
          <button className="icon-btn del" title="מחיקה" onClick={() => onRemove(task.id)}>
            🗑️
          </button>
        )}
      </div>
    </li>
  )
}
