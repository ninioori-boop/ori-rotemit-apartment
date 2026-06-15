// ===== מסך המשימות: קטגוריות =====
export const CATEGORIES = [
  {
    id: 'kesafim',
    icon: '💰',
    title: 'שיקים והעברות כספיות',
    desc: 'מה שצריך להעביר לבעלת הדירה',
    tasks: [
      { id: 'k1', emoji: '🏠', label: '12 שיקים לבעלת הדירה', detail: 'שכר דירה + דמי ועד בית (דיירים)' },
      { id: 'k2', emoji: '📄', label: '3 שיקים ריקים לביטחון לחברות', detail: 'עירייה · מי אביבים · חברת חשמל' },
      { id: 'k3', emoji: '🛡️', label: 'שיק ביטחון', detail: 'על סך 13,000 ₪' },
    ],
  },
  {
    id: 'rihut',
    icon: '🛋️',
    title: 'ריהוט וקניות לבית',
    desc: 'מה שצריך לקנות כדי שהבית יהיה מוכן',
    tasks: [
      { id: 'r1', emoji: '🛋️', label: 'ספה' },
      { id: 'r2', emoji: '🍽️', label: 'שולחן אוכל' },
      { id: 'r3', emoji: '🍳', label: 'מטבחון מיני' },
      { id: 'r4', emoji: '🧼', label: 'מדיח כלים' },
      { id: 'r5', emoji: '🐾', label: 'מקום ישיבה לריינו' },
      { id: 'r6', emoji: '💻', label: 'שולחן עבודה' },
      { id: 'r7', emoji: '📺', label: 'טלוויזיה' },
      { id: 'r8', emoji: '🪞', label: 'מראה' },
      { id: 'r9', emoji: '👟', label: 'ארון נעליים' },
      { id: 'r10', emoji: '🍴', label: 'כלי מטבח' },
    ],
  },
  {
    id: 'horaot',
    icon: '🔁',
    title: 'הוראות קבע',
    desc: 'להסדיר תשלומים קבועים',
    tasks: [
      { id: 'h1', emoji: '⚡', label: 'הוראת קבע – חברת חשמל' },
      { id: 'h2', emoji: '💧', label: 'הוראת קבע – מי אביבים' },
      { id: 'h3', emoji: '🏛️', label: 'הוראת קבע – עירייה' },
    ],
  },
  {
    id: 'hemshech',
    icon: '📦',
    title: 'מכשירים ומשימות להמשך',
    desc: 'דברים שנשלים בהמשך הדרך',
    tasks: [
      { id: 'm1', emoji: '🧹', label: 'שואב אבק דייסון (Dyson)' },
      { id: 'm2', emoji: '🍲', label: "נינג'ה (Ninja)" },
      { id: 'm3', emoji: '🔥', label: 'לחבר את הגז' },
      { id: 'm4', emoji: '🍞', label: 'תנור – לקנות או להביא' },
      { id: 'm5', emoji: '♨️', label: 'מיקרוגל' },
      { id: 'm6', emoji: '🚰', label: 'תמי 4' },
      { id: 'm7', emoji: '☕', label: 'מכונת קפה' },
    ],
  },
]

// בורר השיוך במסך המשימות
export const OWNERS = {
  uri:   { label: 'אורי',  emoji: '👨', cls: 'on-uri',   rowCls: 'owner-uri' },
  rotem: { label: 'רותם',  emoji: '👩', cls: 'on-rotem', rowCls: 'owner-rotem' },
  done:  { label: 'הושלם', emoji: '✓',  cls: 'on-done',  rowCls: 'done' },
}

// ===== מסך ההובלה: בורר מצב לכל מוצר =====
export const MOVE_OPTIONS = {
  tenant:    { label: 'לקנות מהדיירת',     emoji: '🔑', cls: 'on-tenant',    rowCls: 'move-tenant' },
  gindi:     { label: 'קיים בגינדי',       emoji: '🏠', cls: 'on-gindi',     rowCls: 'move-gindi' },
  kingeorge: { label: "קיים בקינג ג'ורג'", emoji: '🏛️', cls: 'on-kingeorge', rowCls: 'move-kingeorge' },
  buy:       { label: 'צריך לקנות',        emoji: '🛒', cls: 'on-buy',       rowCls: 'move-buy' },
}

// רשימת המוצרים ההתחלתית למסך ההובלה (אפשר להוסיף עוד תמיד)
export const MOVING_ITEMS = [
  { id: 'mv-sofa',        emoji: '🛋️', label: 'ספה' },
  { id: 'mv-table',       emoji: '🍽️', label: 'שולחן אוכל' },
  { id: 'mv-kitchenette', emoji: '🍳', label: 'מטבחון מיני' },
  { id: 'mv-dishwasher',  emoji: '🧼', label: 'מדיח כלים' },
  { id: 'mv-reino',       emoji: '🐾', label: 'מקום ישיבה לריינו' },
  { id: 'mv-desk',        emoji: '💻', label: 'שולחן עבודה' },
  { id: 'mv-tv',          emoji: '📺', label: 'טלוויזיה' },
  { id: 'mv-mirror',      emoji: '🪞', label: 'מראה' },
  { id: 'mv-shoes',       emoji: '👟', label: 'ארון נעליים' },
  { id: 'mv-kitchenware', emoji: '🍴', label: 'כלי מטבח' },
  { id: 'mv-dyson',       emoji: '🧹', label: 'שואב אבק דייסון' },
  { id: 'mv-ninja',       emoji: '🍲', label: "נינג'ה" },
  { id: 'mv-oven',        emoji: '🍞', label: 'תנור' },
  { id: 'mv-micro',       emoji: '♨️', label: 'מיקרוגל' },
  { id: 'mv-tami4',       emoji: '🚰', label: 'תמי 4' },
  { id: 'mv-coffee',      emoji: '☕', label: 'מכונת קפה' },
  // כלי ניקיון
  { id: 'mv-clean1', emoji: '🧴', label: 'חומר ניקוי רצפה' },
  { id: 'mv-clean2', emoji: '🧽', label: 'ספוגים וסמרטוטים' },
  { id: 'mv-clean3', emoji: '🧹', label: 'מטאטא ומגב' },
  { id: 'mv-clean4', emoji: '🪣', label: 'דלי ניקיון' },
  { id: 'mv-clean5', emoji: '🧻', label: 'נייר טואלט' },
  // שירותים
  { id: 'mv-bath1', emoji: '🚿', label: 'וילון מקלחת' },
  { id: 'mv-bath2', emoji: '🪥', label: 'מחזיק מברשות שיניים' },
  { id: 'mv-bath3', emoji: '🧴', label: 'מתקן סבון לשירותים' },
  { id: 'mv-bath4', emoji: '🪞', label: 'מראה לשירותים' },
  { id: 'mv-bath5', emoji: '🏠', label: 'ארון שירותים / מדף' },
]

// ===== מסך הלו"ז: שלבים מוצעים (אפשר לערוך/למחוק/להוסיף) =====
export const SCHEDULE_SEED = [
  { id: 's-contract', date: '', title: 'חתימת חוזה ומסירת השיקים', done: false },
  { id: 's-orders',   date: '', title: 'פתיחת הוראות קבע (חשמל / מים / עירייה)', done: false },
  { id: 's-gindi',    date: '', title: 'הובלה מגינדי', done: false },
  { id: 's-king',     date: '', title: "הובלה מקינג ג'ורג'", done: false },
  { id: 's-gas',      date: '', title: 'חיבור גז', done: false },
  { id: 's-clean',    date: '', title: 'ניקיון הדירה החדשה', done: false },
  { id: 's-entry',    date: '', title: 'כניסה לדירה 🎉', done: false },
]
