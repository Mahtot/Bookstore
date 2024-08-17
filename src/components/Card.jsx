import React, { useContext, useState, useEffect } from "react";
import { IoHeartCircleSharp } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BookContext } from "../context/BookContext";

function Card({ img, title, authors }) {
  const navigateTo = useNavigate();
  const {
    wishlist,
    addWishlist,
    removeWishlist,
    cart,
    addToCart,
    removeFromCart,
  } = useContext(BookContext);

  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setAddedToWishlist(
      wishlist.some((item) => item.volumeInfo?.title === title)
    );
    setInCart(cart.some((item) => item.volumeInfo?.title === title));
  }, [wishlist, cart, title]);

  const handleWishlistClick = (e) => {
    e.stopPropagation(); // Prevent card click from firing
    if (addedToWishlist) {
      removeWishlist({
        volumeInfo: { title, imageLinks: { smallThumbnail: img }, authors },
      });
      alert(`**${title}** removed from wishlist`);
    } else {
      addWishlist({
        volumeInfo: { title, imageLinks: { smallThumbnail: img }, authors },
      });
      alert(`**${title}** added to wishlist`);
    }
    setAddedToWishlist((prevValue) => !prevValue);
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation(); // Prevent card click from firing
    if (inCart) {
      removeFromCart({
        volumeInfo: { title, imageLinks: { smallThumbnail: img }, authors },
      });
      alert(`**${title}** removed from shopping cart`);
    } else {
      addToCart({
        volumeInfo: { title, imageLinks: { smallThumbnail: img }, authors },
      });
      alert(`**${title}** successfully added to your cart.`);
    }
    setInCart((prevValue) => !prevValue);
  };

  const handleClick = () => {
    navigateTo(`/book-store/detail?title=${title}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer card max-w-xs font-inter bg-[#313131] hover:bg-[#101010] rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 items-center justify-center flex flex-col hover:border border-black"
    >
      <img className="w-auto h-auto object-cover" src={img} alt={title} />

      <div className="p-4">
        <h2 className="531:text-[18px] font-bold text-white font-serif">
          {title}
        </h2>

        <p className="author mt-1 text-sm text-gray-500">By: {authors}</p>
        <p className="mt-2 font-mono text-white">100 birr</p>
        <div className="flex justify-between items-center p-4 w-full absolute top-0 left-0">
          <IoHeartCircleSharp
            size={"1.5rem"}
            title={addedToWishlist ? "Remove from wishlist" : "Add to wishlist"}
            className={`${
              addedToWishlist ? "text-red-600" : "text-red-100"
            } cursor-pointer hover:text-red-600 transition-colors`}
            onClick={handleWishlistClick}
          />
          <FaCartPlus
            size={"1.5rem"}
            title={inCart ? "Remove from cart" : "Add to cart"}
            className={`${
              inCart ? "text-green-600" : "text-green-100"
            } cursor-pointer hover:text-green-600 transition-colors`}
            onClick={handleAddToCartClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
