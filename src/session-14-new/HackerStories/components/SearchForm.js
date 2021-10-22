import InputWithLabel from "./InputWithLabel";

const SearchForm = ({ onSearchInput, onSearchSubmit, searchTerm }) => (
  <form onSubmit={onSearchSubmit}>
    <InputWithLabel
      id="search"
      value={searchTerm}
      onInputChange={onSearchInput}
      type="text"
    >
      <strong>Search For Stories</strong>
    </InputWithLabel>
    <button disabled={!searchTerm} type="submit">
      Submit
    </button>
  </form>
);

export default SearchForm;
