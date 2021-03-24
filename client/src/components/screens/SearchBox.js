import React, { useState } from "react";

export default function SearchBox(props) {
  const [keywords, setKeywords] = useState("");
  const handleSearch = () => {
    props.history.push("");
  };
  return (
    <div className="search-box">
      <input
        type="text"
        name="keywords"
        id="keywords"
        placeholder="Search products ..."
        className="search-input"
        onChange={(e) => setKeywords(e.target.value)}
      />
      <button
        style={{ marginLeft: "0.5rem" }}
        type="button"
        className="primary"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
