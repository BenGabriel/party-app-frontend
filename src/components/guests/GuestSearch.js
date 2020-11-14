import React, { useContext, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import GuestContext from "../../context/guestContext/GuestContext";

const GuestSearch = () => {
  const { searchGuest, clearSearch } = useContext(GuestContext);
  const searchValue = useRef("");
  const handleChange = (e) => {
    if (searchValue.current.value !== "") {
      searchGuest(e.target.value);
    } else {
      clearSearch();
    }
  };
  return (
    <div>
      <input
        ref={searchValue}
        type="text"
        placeholder=" Search Guest by name"
        className="search"
        onChange={handleChange}
      />
      <i className="search-icon">
        <FaSearch />
      </i>
    </div>
  );
};

export default GuestSearch;
