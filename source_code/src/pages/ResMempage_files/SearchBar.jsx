import React from "react";
import "./SearchBar.css";
import searchIcon from "./assets/magnifying-glass.png";

function SearchBar({ searchTerm, setSearchTerm, onSubmit }) {
  return (
    <div className="search-bar-resmem">
    <div className="search-container-resmem">
      <input
        type="text"
        placeholder="Search"
        id="search-input-resmem"
        // value={searchQuery}
        // onChange={handleSearch}
      />
      <button type="submit" id="submit-resmem">
        <img
          className="search-img-resmem"
          src="/assets/magnifying-glass.png"
          alt="Search"
        ></img>
      </button>
    </div>
  </div>
  );
}

export default SearchBar;
