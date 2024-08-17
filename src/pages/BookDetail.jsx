import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import Header from "../components/Header";
import Loading from "../assets/imgs/loading.json";
import { IoHeartCircleSharp } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import { BookContext } from "../context/BookContext";
import Footer from "../components/Footer";

function BookDetail() {
  const {
    wishlist,
    addWishlist,
    removeWishlist,
    cart,
    addToCart,
    removeFromCart,
  } = useContext(BookContext);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const value = query.get("title");
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    if (value) {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${value}&key=AIzaSyANdzSfMHN7iRIQtPrZaXrvjTQldrd8G5o&maxResults=1`
        )
        .then((response) => {
          setBook(response.data.items ? response.data.items[0] : null);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [value]);

  useEffect(() => {
    if (book) {
      setAddedToWishlist(
        wishlist.some(
          (item) => item.volumeInfo?.title === book.volumeInfo?.title
        )
      );
      setInCart(
        cart.some((item) => item.volumeInfo?.title === book.volumeInfo?.title)
      );
    }
  }, [book, wishlist, cart]);

  const handleWishlistClick = () => {
    if (addedToWishlist) {
      removeWishlist(book);
      alert(`**${book.volumeInfo?.title}** removed from wishlist`);
    } else {
      addWishlist(book);
      alert(`**${book.volumeInfo?.title}** added to wishlist`);
    }
    setAddedToWishlist((prevValue) => !prevValue);
  };

  const handleAddToCartClick = () => {
    if (inCart) {
      removeFromCart(book);
      alert(`**${book.volumeInfo?.title}** removed from shopping cart`);
    } else {
      addToCart(book);
      alert(`**${book.volumeInfo?.title}** successfully added to your cart.`);
    }
    setInCart((prevValue) => !prevValue);
  };

  return (
    <div className={`flex flex-col gap-10 ${book ? "bg-gray-100" : ""} w-full`}>
      <Header />
      {isLoading ? (
        <div
          className="flex items-center justify-center mx-auto"
          style={{ width: "100px" }}
        >
          <Lottie loop={true} animationData={Loading} />
        </div>
      ) : book ? (
        <div className="flex flex-col items-center 531:w-[80vw] justify-center mx-auto mt-10">
          <div className="flex flex-row items-center justify-center gap-2 531:gap-10  992:w-[50vw] mx-auto p-4 ">
            <img
              src={book.volumeInfo?.imageLinks?.smallThumbnail}
              alt={book.volumeInfo?.title || "Book Thumbnail"}
              className="mb-4 z-40  shadow-[-5px_5px_5px_#93622A]"
            />
            <div className="flex flex-col gap-3 self-start">
              <h2 className="531:text-2xl font-bold font-inter">
                {book.volumeInfo?.title}
              </h2>
              <p className="text-sm text-gray-600 font-bold">
                {book.volumeInfo?.authors?.join(", ")}
              </p>
            </div>
          </div>

          <div className="flex flex-col bg-white relative top-[0px]  344:top-[-90px] p-10 justify-center items-center shadow-2xl">
            <div className="flex flex-col 344:flex-row mb-[50px] font-inter self-end gap-10 items-center w-full 785:w-auto mt-[50px] 785:mt-0 justify-center">
              <a
                href={book.volumeInfo.previewLink}
                className="bg-[#93622A] text-white p-2 rounded-3xl px-10 opacity-80 hover:opacity-100 transition-opacity"
              >
                Start reading
              </a>
              <div className="flex gap-5">
                <FaCartPlus
                  size={"1.5rem"}
                  title={`${inCart ? "Remove from cart" : "Add to cart"} `}
                  className={`${
                    inCart ? "text-green-600" : ""
                  } hover:text-green-600 cursor-pointer transition-colors`}
                  onClick={handleAddToCartClick}
                />
                <IoHeartCircleSharp
                  size={"1.5rem"}
                  title={`${
                    addedToWishlist
                      ? "Remove from wishlist"
                      : " Add to wishlist"
                  }`}
                  className={`${
                    addedToWishlist ? "text-red-600" : "text-gray-700"
                  } hover:text-red-600 cursor-pointer transition-colors`}
                  onClick={handleWishlistClick}
                />
              </div>
            </div>
            <div className="flex flex-col font-inter gap-10">
              <div className="flex flex-col">
                <h3 className="text-xl font-bold">Description</h3>
                <p className="text-md mt-4 text-gray-600 text-left">
                  {book.volumeInfo?.description || "No description available."}
                </p>
              </div>
              <div className="flex mt-8 justify-between">
                <div className="flex flex-col">
                  <h4 className="text-lg font-semibold text-[#333]">
                    Publisher
                  </h4>
                  <p className="text-gray-600">
                    {book.volumeInfo?.publisher || "Not available"}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-lg font-semibold text-[#333]">
                    Published Date
                  </h4>
                  <p className="text-gray-600">
                    {book.volumeInfo?.publishedDate || "Not available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No book found.</p>
      )}

      <Footer />
    </div>
  );
}

export default BookDetail;
