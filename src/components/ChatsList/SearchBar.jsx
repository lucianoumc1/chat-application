import searchIcon from "../../assets/search.png";

export function SearchBar({ chatFilter, setChatFilter }) {
  return (
    <div className="search-bar__container">
      <img
        src={searchIcon}
        alt="search-icon"
        className="search-bar__search-icon"
      />
      <input
        className="search-bar__input"
        placeholder="Find a chat"
        onChange={(ev) => setChatFilter(ev.target.value.toLowerCase())}
        value={chatFilter}
      />
    </div>
  );
}
