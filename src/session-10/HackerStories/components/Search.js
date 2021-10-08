const Search = ({ onSearch,searchTerm }) => (
  <div>
    <label htmlFor="search">Search for stories: </label>
    <input value={searchTerm} id="search" type="text" onChange={onSearch} />
  </div>
);

export default Search;
