import InputWithLabel from "./InputWithLabel";
import "./SearchForm.css";

const SearchForm = ({ onSearchInput, onSearchSubmit, searchTerm }) => (
  <form onSubmit={onSearchSubmit}>
    <InputWithLabel
      id="search"
      value={searchTerm}
      onInputChange={onSearchInput}
      type="text"
    ></InputWithLabel>
    <button className="button" disabled={!searchTerm} type="submit">
      Submit
    </button>
  </form>
);

export default SearchForm;
