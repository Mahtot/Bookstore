import Header from "../components/Header";
import { useEffect, useState, useContext } from "react";
import { BookContext } from "../context/BookContext";
import Card from "../components/Card";
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";

function Wishlist() {
  const { wishlist } = useContext(BookContext);

  return (
    <div className="flex flex-col gap-10 w-full">
      <Header />
      <div className="flex flex-col font-inter p-10 gap-10">
        <h2 className="text-[#93622A] font-semibold text-xl sm:text-4xl font-mono">
          Wishlists
        </h2>
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 785:grid-cols-3 1097:grid-cols-4 gap-6 ">
            {wishlist.map((item, index) => {
              const thumbnail = item.volumeInfo?.imageLinks?.smallThumbnail;

              return thumbnail ? (
                <Card
                  key={index}
                  img={thumbnail}
                  title={item.volumeInfo.title}
                  more={item.volumeInfo.previewLink}
                  publisher={item.volumeInfo.publisher}
                  authors={item.volumeInfo.authors}
                  publishedDate={item.volumeInfo.publishedDate}
                  description={item.volumeInfo.description}
                />
              ) : null;
            })}
          </div>
        ) : (
          <div className="text-center mt-10 flex flex-col items-center">
            <h2 className="text-lg text-gray-500">
              You have no books in your cart
            </h2>
            <NavLink
              to="/books"
              className="mt-4 w-full sm:w-[50%] px-6 py-2 bg-[#313131] text-white rounded-lg hover:opacity-85 transition-opacity"
            >
              Explore Books Here
            </NavLink>
          </div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
export default Wishlist;
