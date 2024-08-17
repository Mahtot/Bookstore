import { NavLink } from "react-router-dom";
import logo from "../assets/imgs/logo.png";

function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-white py-8 mt-10">
      <div className="container mx-auto flex flex-col items-center">
        <div className="footer grid  md:grid-cols-4 gap-5  mb-6  items-center justify-center">
          <NavLink to="/">
            <img
              src={logo}
              alt="logo"
              className="w-[150px] md:w-[200px] rounded-full mr-8"
            />
          </NavLink>
          <NavLink
            to="/books"
            className="hover:text-[#93622A] transition-colors "
          >
            Books
          </NavLink>
          <NavLink
            to="/categories"
            className="hover:text-[#93622A] transition-colors"
          >
            Categories
          </NavLink>

          <NavLink to="/" className="hover:text-[#93622A] transition-colors">
            About Us
          </NavLink>
        </div>
        <div className="mt-6 ">
          <div className="flex space-x-4 mt-2 text-[14px]">
            <NavLink to="/" className="hover:text-[#93622A] transition-colors">
              Privacy Policy
            </NavLink>
            <NavLink to="/" className="hover:text-[#93622A] transition-colors">
              Terms of Service
            </NavLink>
            <NavLink to="/" className="hover:text-[#93622A] transition-colors">
              Contact Us
            </NavLink>
          </div>
          <p className="text-sm text-center mt-5">&copy; 2024 Bookstore</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
