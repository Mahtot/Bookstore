import { createContext, useState, useEffect } from "react";

const BookContext = createContext();

const ApiProvider = ({ children }) => {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    const storedCart = JSON.parse(localStorage.getItem("cart"));

    if (storedWishlist) {
      setWishlist(storedWishlist);
    }

    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  const addWishlist = (book) => {
    setWishlist((prev) => {
      const updatedWishlist = [...prev, book];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  const removeWishlist = (book) => {
    setWishlist((prev) => {
      const updatedWishlist = prev.filter(
        (item) => item.volumeInfo?.title !== book.volumeInfo?.title
      );
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  const addToCart = (book) => {
    setCart((prev) => {
      const updatedCart = [...prev, book];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (book) => {
    setCart((prev) => {
      const updatedCart = prev.filter(
        (item) => item.volumeInfo?.title !== book.volumeInfo?.title
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <BookContext.Provider
      value={{
        searchedBooks,
        setSearchedBooks,
        wishlist,
        setWishlist,
        cart,
        setCart,
        removeWishlist,
        addWishlist,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export { BookContext, ApiProvider };
