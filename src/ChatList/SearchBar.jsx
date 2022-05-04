export function SearchBar({ chatFilter, setChatFilter }) {
  return (
    <div className="search-bar__container">
      <span className="search-bar__search-icon" />
      <input
        className="search-bar__input"
        onChange={(ev) => setChatFilter(ev.target.value.toLowerCase())}
        value={chatFilter}
      />
    </div>
  );
}
