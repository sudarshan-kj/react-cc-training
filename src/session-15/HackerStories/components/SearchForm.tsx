import React from "react";
import InputWithLabel from "./InputWithLabel";
import "./SearchForm.css";

type SearchFormProps = {
  searchTerm: string;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: any;
};

const SearchForm = ({
  onSearchInput,
  onSearchSubmit,
  searchTerm,
}: SearchFormProps) => (
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
