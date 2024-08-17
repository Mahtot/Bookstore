import Header from "../components/Header";
import { BookContext } from "../context/BookContext";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import success from "../assets/imgs/success.json";
import Footer from "../components/Footer";

function Checkout() {
  const { cart, setCart } = useContext(BookContext);
  const navigateTo = useNavigate();
  const [purchased, setPurchased] = useState(false);
  const [loading, setLoading] = useState(false); // Loader state
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false); // Stop loader
      setPurchased(true);
    }, 2000);

    setCart([]);
  };

  return (
    <div
      className={`flex flex-col gap-10 w-full items-center font-inter ${
        cart.length > 0 ? "bg-slate-100" : ""
      } `}
    >
      <Header />
      <div className="flex flex-col w-[90vw] sm:w-[80vw] bg-white p-10 justify-center gap-10 shadow-2xl">
        <h2 className="text-[#93622A] font-semibold text-xl sm:text-2xl ">
          Checkout
        </h2>
        {loading ? (
          <div
            className="flex items-center justify-center mx-auto"
            style={{ width: "150px", height: "150px" }}
          >
            <Lottie loop={true} animationData={success} />
          </div>
        ) : purchased ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#93622A] mb-5">
              Congratulations, {userInfo.firstName} {userInfo.lastName}!
            </h2>
            <p className="text-gray-600 mb-2">
              You have successfully purchased the following books:
            </p>
            <ul className="list-disc list-inside mb-5">
              {cart.map((item, index) => (
                <li key={index} className="text-gray-700">
                  {item.volumeInfo.title}
                </li>
              ))}
            </ul>
            <p className="text-gray-600 mb-2">Your order will be shipped to:</p>
            <p className="text-gray-700">
              {userInfo.address}, {userInfo.country}
            </p>
            <p className="text-gray-600 mt-5">
              A confirmation email has been sent to{" "}
              <span className="font-semibold text-gray-800">
                {userInfo.email}
              </span>
              .
            </p>
            <NavLink
              to="/books"
              className="mt-10 inline-block px-6 py-2 bg-[#93622A] text-white rounded-lg hover:opacity-85 transition-opacity"
            >
              Continue Shopping
            </NavLink>
          </div>
        ) : (
          <div className="flex flex-row 785:flex-col gap-10 w-full">
            {cart.length > 0 ? (
              <div className="flex flex-col 785:flex-row gap-10">
                <form
                  className="flex flex-col w-full gap-5"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col sm:flex-row gap-5">
                    <input
                      type="text"
                      name="firstName"
                      value={userInfo.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      required
                      className="border border-gray-300 p-2 rounded-md w-full sm:w-[48%]"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={userInfo.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      required
                      className="border border-gray-300 p-2 rounded-md w-full sm:w-[48%]"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                  <input
                    type="text"
                    name="address"
                    value={userInfo.address}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                  <select
                    name="country"
                    value={userInfo.country}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-2 rounded-md w-full"
                  >
                    <option value="">Select Country</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Kenya">Kenya</option>
                  </select>
                  <button
                    type="submit"
                    className="bg-[#93622A] text-white p-2 rounded-md w-full sm:w-[100%] hover:bg-[#7b4d20] transition-colors"
                  >
                    Complete Purchase
                  </button>
                </form>
                <div className="flex flex-col gap-5 border p-2">
                  <h2 className=" font-mono text-xl  mx-5 sm:mx-10">
                    Your Order
                  </h2>
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col text-[11px] sm:flex-row gap-5 items-center border shadow-sm p-5 sm:p-8transition-all"
                    >
                      <img
                        src={item.volumeInfo?.imageLinks?.smallThumbnail}
                        alt={item.volumeInfo.title}
                        className="w-[80px] h-[60px] rounded-lg"
                      />
                      <h3 className="text-[12px] text-gray-600 font-inter">
                        {item.volumeInfo.title}
                      </h3>
                      <h3 className=" text-gray-600 ">1000 birr</h3>
                    </div>
                  ))}

                  <h2 className=" font-mono text-xl  mx-5 sm:mx-10">
                    Total: {cart.length * 1000} birr
                  </h2>
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
        )}
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}

export default Checkout;
