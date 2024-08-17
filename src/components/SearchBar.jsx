import { useState, useEffect, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "https://cdn.skypack.dev/axios";
import { useNavigate } from "react-router-dom";
import { BookContext } from "../context/BookContext";

function SearchBar() {
  const [input, setInput] = useState("");
  const { searchedBooks, setSearchedBooks } = useContext(BookContext);
  const navigateTo = useNavigate();

  // api for google book
  const googleBookApiKey = import.meta.env.VITE_GOOGLE_BOOK_API_KEY;

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
        `https://www.googleapis.com/books/v1/volumes?q=${value}&key=${googleBookApiKey}&maxResults=10`
      )
      .then((response) => {
        setSearchedBooks(response.data.items || []);
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
      if (input) {
        fetchData(input);
      } else {
        setSearchedBooks([]);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex w-full bg-inherit shadow-2xl items-center gap-3 p-2 px-3 border border-[#F3E998] rounded-2xl">
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
