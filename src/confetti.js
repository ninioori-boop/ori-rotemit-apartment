// קונפטי קליל בלי תלות חיצונית — קנבס יחיד שנדבק ל-body
const COLORS = ['#75AADB', '#F6B40E', '#ffffff', '#4A90C9', '#ffd95e']

let cv, ctx, parts = [], running = false

function ensure() {
  if (cv) return
  cv = document.createElement('canvas')
  cv.id = 'confetti'
  Object.assign(cv.style, {
    position: 'fixed', inset: '0', pointerEvents: 'none', zIndex: '50',
  })
  document.body.appendChild(cv)
  ctx = cv.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
}
function resize() {
  if (!cv) return
  cv.width = window.innerWidth
  cv.height = window.innerHeight
}
function spawn(x, y, n, spread) {
  ensure()
  for (let i = 0; i < n; i++) {
    parts.push({
      x, y,
      vx: (Math.random() - 0.5) * spread,
      vy: (Math.random() * -1 - 0.5) * spread * 0.8 - 2,
      g: 0.22 + Math.random() * 0.12,
      size: 5 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: Math.random() * 6.28,
      vr: (Math.random() - 0.5) * 0.4,
      life: 90 + Math.random() * 40,
    })
  }
  if (!running) loop()
}
function loop() {
  running = true
  ctx.clearRect(0, 0, cv.width, cv.height)
  parts.forEach((p) => {
    p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life--
    ctx.save()
    ctx.translate(p.x, p.y); ctx.rotate(p.rot)
    ctx.fillStyle = p.color
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
    ctx.restore()
  })
  parts = parts.filter((p) => p.life > 0 && p.y < cv.height + 40)
  if (parts.length) requestAnimationFrame(loop)
  else { ctx.clearRect(0, 0, cv.width, cv.height); running = false }
}

export function burstAt(el) {
  if (!el) return
  const r = el.getBoundingClientRect()
  spawn(r.left + r.width / 2, r.top + r.height / 2, 18, 6)
}
export function bigConfetti() {
  for (let i = 0; i < 8; i++) {
    setTimeout(() => spawn(Math.random() * window.innerWidth, -20, 30, 9), i * 120)
  }
}
