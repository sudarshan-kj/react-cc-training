const Search = ({ onSearch }) => (
  <div>
    <label htmlFor="search">Search for stories: </label>
    <input id="search" type="text" onChange={onSearch} />
  </div>
);

export default Search;
