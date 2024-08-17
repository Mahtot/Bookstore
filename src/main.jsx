import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchResults from "./pages/SearchResults.jsx";
import { ApiProvider } from "./context/BookContext.jsx";
import Categories from "./pages/Categories.jsx";
import Books from "./pages/Books.jsx";
import Cart from "./pages/Cart.jsx";
import Wishlist from "./pages/wishlist.jsx";
import Home from "./pages/Home.jsx";
import BookDetail from "./pages/BookDetail.jsx";
import BuyBook from "./pages/BuyBook.jsx";
import Checkout from "./pages/Checkout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ApiProvider>
      <App />
      <Routes>
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/books" element={<Books />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/my-cart" element={<Cart />} />
        <Route path="/" element={<Home />} />
        <Route path="/book-store/detail" element={<BookDetail />} />
        <Route path="/buy-book" element={<BuyBook />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </ApiProvider>
  </BrowserRouter>
);
