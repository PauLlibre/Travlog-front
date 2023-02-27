import React from "react";
import "./SearchBar.scss";

export default function SearchBar() {
  return (
    <div className="search-bar-root">
      <div className="search-bar">
        <input type="text" placeholder="search" />
      </div>
      {/* <button>Search</button>
      <button>Filter</button> */}
    </div>
  );
}
