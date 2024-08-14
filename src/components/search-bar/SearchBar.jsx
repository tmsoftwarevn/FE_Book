import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function SearchBar(props) {
  const { setKeySearch } = props;
  const [barValue, setBarValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const handleSearch = (event) => {
    navigate(`/tin-tuc/tim-kiem?s=${inputValue}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  
  return (
    <div className="cursor-pointer w-full flex items-center">
      <div className="relative flex items-center w-full h-10 rounded-full bg-white overflow-hidden">
        <div
          className="grid place-items-center h-full w-12 text-blue-600 bg-gray-200"
          onClick={() => {
            handleSearch()
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          className=" h-full w-full outline-none text-sm bg-gray-200 pr-2"
          type="text"
          id="search"
          placeholder="Tìm kiếm"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>
  );
}

export default SearchBar;
