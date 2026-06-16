// שורת חיפוש — מסננת את הרשימה למוצר/משימה שמקלידים
export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="searchbar">
      <span className="search-ic">🔍</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="search-clear" title="ניקוי" onClick={() => onChange('')}>
          ✕
        </button>
      )}
    </div>
  )
}
