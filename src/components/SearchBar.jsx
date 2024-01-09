import React, { useState } from "react";

const SearchBar = ({ onSearch, onInputStart }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    onSearch(inputValue);
    onInputStart(!!inputValue.trim());
  };

  return (
    <div className="SearchBar">
      <input type="text" placeholder="Город" value={value} onChange={handleChange} />
    </div>
  );
};

export default SearchBar;
