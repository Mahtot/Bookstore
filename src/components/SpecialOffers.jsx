import { useState } from "react";
import newyrImg from "../assets/imgs/newyr.jpeg";
import GirlReading from "../assets/imgs/heroPic.jpeg";

function SpecialOffers() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Thank you for becoming part of us!");
    setEmail("");
  };

  return (
    <div className="flex flex-col gap-10 w-full mt-10">
      {/* New Year Offer Section */}
      <div
        className="relative w-full  flex flex-col items-center justify-center text-center bg-cover bg-center shadow-lg overflow-hidden  transition-transform transform "
        style={{ backgroundImage: `url(${newyrImg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
        <div className="relative z-10 p-4">
          <img
            src={GirlReading}
            alt="Girl Reading"
            className="rounded-full w-32 h-32 sm:w-48 sm:h-48 object-cover border-4 border-white shadow-lg mb-4 transition-transform transform hover:scale-110"
          />
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-4 animate-fadeIn">
            Happy New Year! 🎉
          </h3>
          <h2 className="text-5xl sm:text-6xl font-extrabold text-yellow-300 mb-2 animate-fadeIn">
            Enjoy 50% OFF
          </h2>
          <h3 className="text-lg sm:text-2xl text-white mb-2 sm:mb-4 animate-fadeIn">
            On All Books
          </h3>
          <p className="text-sm sm:text-lg text-white animate-fadeIn">
            Valid from September 8th - 12th
          </p>
        </div>
      </div>

      {/* Subscription Section */}
      <div className="bg-[#f9f9f9] p-10 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold mb-4">Don't Miss Out!</h2>
        <p className="text-lg text-gray-700 mb-6">
          Join our community and stay updated on the latest releases and
          exclusive offers!
        </p>
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#93622A] sm:w-[300px] w-full transition-shadow hover:shadow-lg"
          />
          <button
            type="submit"
            className="bg-[#93622A] text-white py-3 px-6 rounded-lg transition-opacity hover:opacity-90 transform hover:scale-105"
          >
            Subscribe Now
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}

export default SpecialOffers;
