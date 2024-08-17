import Header from "../components/Header";
import { BookContext } from "../context/BookContext";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiCircleRemove } from "react-icons/ci";
import Footer from "../components/Footer";

function Cart() {
  const { cart, removeFromCart } = useContext(BookContext);
  const navigateTo = useNavigate();

  return (
    <div
      className={`flex flex-col gap-10 w-full items-center font-inter ${
        cart.length > 0 ? "bg-slate-100" : ""
      } `}
    >
      <Header />
      <div className="flex flex-col bg-white relative w-full max-w-4xl p-5 sm:p-10 justify-center shadow-2xl">
        <h2 className="text-[#93622A] font-semibold text-xl sm:text-2xl mx-5 sm:mx-10">
          My Cart
        </h2>
        <div className="flex flex-col">
          {cart.length > 0 ? (
            <div className="flex flex-col">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-4 cursor-pointer gap-5 sm:gap-10 m-5 sm:m-10 items-center justify-center border shadow-sm p-5 sm:p-8 hover:shadow-2xl transition-all hover:scale-105"
                  onClick={() =>
                    navigateTo(
                      `/book-store/detail?title=${item.volumeInfo.title}`
                    )
                  }
                >
                  <img
                    src={item.volumeInfo?.imageLinks?.smallThumbnail}
                    alt={item.volumeInfo.title}
                    className="w-24 h-auto rounded-lg"
                  />
                  <h3 className="text-base sm:text-xl text-gray-600 font-inter w-full ">
                    {item.volumeInfo.title}
                  </h3>
                  <h3 className="text-sm sm:text-base text-gray-600 font-bold ">
                    1000 birr
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click from firing
                      removeFromCart(item);
                    }}
                    className="text-gray-600  w-full sm:w-auto"
                  >
                    <CiCircleRemove
                      size={"2rem"}
                      title="Remove"
                      className="opacity-40 hover:opacity-100 transition-opacity"
                    />
                  </button>
                </div>
              ))}

              <div className="mx-5 sm:mx-10 mt-5">
                <button
                  onClick={() => navigateTo("/checkout")}
                  className="w-full sm:w-[30vw] border border-[#93622A] hover:bg-[#93622A] hover:text-white p-2 rounded-xl px-5 sm:px-10 opacity-80 hover:opacity-100 transition-colors"
                >
                  Checkout
                </button>
              </div>
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
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}

export default Cart;
