import InputWithLabel from "./InputWithLabel";
import "./SearchForm.css";

const SearchForm = ({ onSearchInput, onSearchSubmit, searchTerm }) => (
  <form className="searchForm" onSubmit={onSearchSubmit}>
    <InputWithLabel
      id="search"
      value={searchTerm}
      onInputChange={onSearchInput}
      type="text"
    />
    <button className="button_submit" disabled={!searchTerm} type="submit">
      Submit
    </button>
  </form>
);

export default SearchForm;
