import Header from "../components/Header";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import girlReadingImg from "../assets/imgs/girlReading.jpg";
import { FaArrowRight } from "react-icons/fa6";
import Trending from "../components/Trending";
import SpecialOffers from "../components/SpecialOffers";
import newYrImg from "../assets/imgs/newyr.jpeg";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";

function Home() {
  const words = ["Read", "Dream", "Escape"];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWord((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [words.length]);

  return (
    <div className="flex flex-col ">
      <motion.div className="home flex flex-col w-full bg-[#f0f4f8] relative ">
        <Header page="home" />
        <div className="flex flex-col md:flex-row justify-center items-center  w-full px-[40px] mt-9">
          <div className="hero-section flex flex-col justify-center items-start gap-4 text-center md:text-left md:w-1/2">
            <AnimatePresence mode="wait">
              <motion.h1
                className="word text-[#93622A] text-4xl md:text-6xl font-bold font-Inter p-3"
                key={currentWord}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                {words[currentWord]}
              </motion.h1>
            </AnimatePresence>

            <h2 className="text-white text-lg md:text-2xl">
              Books Are Your Gateway to New Worlds!
            </h2>

            <NavLink
              to="/books"
              className="book bg-[#93622A] rounded-md shadow-md p-3 text-white font-Inter w-full md:w-[200px] flex items-center justify-center gap-2 opacity-80 hover:opacity-100 hover:shadow-2xl transition-all"
            >
              Get Your Book Now <FaArrowRight className="arrow" />
            </NavLink>
          </div>
          <div className="flex w-full md:w-1/2 justify-center mt-10 md:mt-0 h-[500px]">
            <img
              src={girlReadingImg}
              alt="Girl reading a book"
              className="w-full max-w-md rounded-xl object-cover absolute z-50 bottom-[-40px]"
            />
          </div>
        </div>
      </motion.div>
      {/* Tending section */}
      <div className="trending  ">
        <Trending />
      </div>
      <div className=" ">
        <SpecialOffers />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
