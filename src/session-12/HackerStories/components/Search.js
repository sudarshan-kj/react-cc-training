import React from "react";
const Search = ({ onSearch, searchTerm }) => (
  <>
    <label htmlFor="search">Search for stories: </label>
    <input id="search" type="text" value={searchTerm} onChange={onSearch} />
  </>
);

export default Search;
