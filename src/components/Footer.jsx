import { NavLink } from "react-router-dom";
import logo from "../assets/imgs/logo.png";

function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-white py-8 mt-10">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex flex-col md:flex-row gap-10 mb-6 w-full items-center justify-center">
          <NavLink to="/">
            <img
              src={logo}
              alt="logo"
              className="w-[150px] md:w-[200px] rounded-full mr-auto"
            />
          </NavLink>
          <NavLink
            to="/books"
            className="hover:text-[#93622A] transition-colors ml-10"
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
        <div className="mt-6">
          <p className="text-sm text-center">&copy; 2024 Bookstore</p>
          <div className="flex space-x-4 mt-2">
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
        </div>
      </div>
    </footer>
  );
}

export default Footer;
