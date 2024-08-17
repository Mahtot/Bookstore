import { useState, useEffect, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import { BookContext } from "../context/BookContext";

function SearchBar() {
  const [input, setInput] = useState("");
  const { searchedBooks, setSearchedBooks } = useContext(BookContext);
  const navigateTo = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (input) {
        fetchData(input);
      } else {
        setSearchedBooks([]);
      }
    }, 300); // Debounce delay (300ms)

    return () => clearTimeout(delayDebounceFn);
  }, [input]);

  const fetchData = (value) => {
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          value +
          "&key=AIzaSyANdzSfMHN7iRIQtPrZaXrvjTQldrd8G5o" +
          "&maxResults=10"
      )
      .then((response) => {
        setSearchedBooks(response.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    navigateTo("/search-results");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      clearTimeout(); // Clear any existing timeout
      if (input) {
        fetchData(input);
      } else {
        setSearchedBooks([]);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex w-full bg-inherit shadow-2xl  items-center gap-3 p-2 px-3 border border-[#F3E998] rounded-2xl">
        <FaSearch />
        <input
          type="search"
          placeholder="Enter book title"
          className="w-full outline-none border-0 bg-inherit"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default SearchBar;
