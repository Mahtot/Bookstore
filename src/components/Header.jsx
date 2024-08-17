import SearchBar from "./SearchBar";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/imgs/logo.png";
import { IoMenu, IoClose, IoHeartCircleSharp } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { BookContext } from "../context/BookContext";

function Header({ page }) {
  const [menu, setMenu] = useState(false);
  const { cart } = useContext(BookContext);
  const navigateTo = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menu && !event.target.closest(".navigator")) {
        setMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menu]);

  const handleLinksClick = () => {
    setMenu(false);
  };

  return (
    <header
      className={`flex flex-col gap-2 items-center justify-center w-full shadow-lg ${
        page === "home" ? "bg-inherit " : "bg-[#313131]"
      } font-inter text-[#e7e5e0]`}
    >
      <div className="w-full flex justify-between items-center p-4  border border-t-0 border-x-0 border-b-[#4e4d4d] ">
        <NavLink to="/">
          <img
            src={logo}
            alt="logo"
            className="w-[150px] md:w-[200px] rounded-full "
          />
        </NavLink>

        <div className="md:hidden flex opacity-50 hover:opacity-90 text-[#F3E998] transition-opacity ">
          <IoMenu size={"2rem"} onClick={() => setMenu(true)} />
        </div>
        <div
          className={`navigator flex-col flex fixed p-4 md:p-0 z-50 bg-[#2F2F2F] overflow-y-scroll md:overflow-y-hidden w-[100vw] left-0 justify-center  items-center top-0 bottom-0 md:bottom-auto md:top-auto h-[60vh] md:h-auto md:w-auto md:bg-inherit  md:relative  md:flex-row gap-10 ${
            menu ? "translate-y-[0px]" : "translate-y-[-1000px]"
          } md:flex md:translate-y-[0px] transition-all`}
        >
          <div className="md:hidden flex text-[#F3E998] opacity-50 hover:opacity-90  transition-opacity fixed top-[10px] right-[30px]">
            <IoClose size={"2rem"} onClick={() => setMenu(false)} />
          </div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-[#c94616] border-b-2 border-[#c94616]"
                : "hover:text-[#c94616] transition-colors mt-[50px] md:mt-0 cursor-pointer"
            }
            onClick={handleLinksClick}
          >
            Home
          </NavLink>
          <h3>
            <NavLink
              to="/books"
              className={({ isActive }) =>
                isActive
                  ? "text-[#c94616] border-b-2 border-[#c94616]"
                  : "hover:text-[#c94616] transition-colors cursor-pointer"
              }
              onClick={handleLinksClick}
            >
              Books
            </NavLink>
          </h3>
          <h3>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive
                  ? "text-[#c94616] border-b-2 border-[#c94616]"
                  : "hover:text-[#c94616] transition-colors cursor-pointer"
              }
              onClick={handleLinksClick}
            >
              Categories
            </NavLink>
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-7 flex-col 627:flex-row justify-center  627:w-[80vw]">
        <div className="w-[80vw]  md:w-[80vw] p-4  mx-auto flex items-end">
          <SearchBar />
        </div>
        <div className="flex items-center md:gap-10 w-full text-[14px] 627:text-[16px] flex-col 300:flex-row justify-center">
          {/* My Cart Section */}
          <div
            className=" relative flex items-center gap-2 p-2  hover:text-green-600 -transform transform cursor-pointer "
            onClick={() => navigateTo("/my-cart")}
          >
            <p
              className={`absolute top-[-10px] ${
                page ? "right-[30px] " : "right-[0px] "
              } md:right-[-10px] bg-[#F3E998] text-black rounded-full w-6 h-6 flex items-center justify-center font-bold`}
            >
              {cart.length}
            </p>
            <FaCartPlus size={"1.5rem"} />
            <h3 className=" font-semibold">My Cart</h3>
          </div>

          {/* Wish List Section */}
          <div
            className="flex items-center gap-2 p-2  hover:text-red-400  cursor-pointer "
            onClick={() => navigateTo("/wishlist")}
          >
            <IoHeartCircleSharp size={"1.5rem"} />
            <h3 className=" font-semibold ">Wish List</h3>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
