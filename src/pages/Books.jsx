import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../assets/imgs/loading.json";
import Lottie from "lottie-react";
import Card from "../components/Card";

function Books() {
  const [value, setValue] = useState("all");
  const [isLoading, setIsloading] = useState(true);
  const [displayBooks, setDisplayBooks] = useState([]);

  // api for google book
  const googleBookApiKey = import.meta.env.VITE_GOOGLE_BOOK_API_KEY;

  useEffect(() => {
    setIsloading(true);
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${value}&key=${googleBookApiKey}&maxResults=10`
      )
      .then((response) => {
        const books = response.data.items || [];
        setIsloading(false);
        // Randomly select 8 books from the fetched data
        const randomBooks = books.sort(() => 0.5 - Math.random()).slice(0, 8);
        setDisplayBooks(randomBooks);
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  }, [value]);

  return (
    <div className="flex flex-col gap-10 w-full items-center">
      <Header />
      <h1 className="font-mono font-bold text-[#93622A] text-[24px] 785:text-4xl">
        Books
      </h1>
      <div className="flex flex-col w-full p-10 gap-10 items-center">
        <div className="flex flex-col w-[100px]785:w-auto 785:flex-row gap-10 font-inter text-gray-500 justify-center">
          <button
            className={`${
              value === "all"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "hover:text-gray-900 hover:border-b"
            } border-t-0 border-l-0 border-r-0 transition-all`}
            onClick={() => setValue("all")}
          >
            All
          </button>
          <button
            className={`${
              value === "recents"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "hover:text-gray-900 hover:border-b"
            } border-t-0 border-l-0 border-r-0 transition-all`}
            onClick={() => setValue("recents")}
          >
            Recents
          </button>
          <button
            className={`${
              value === "most viewed"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "hover:text-gray-900 hover:border-b"
            } border-t-0 border-l-0 border-r-0 transition-all`}
            onClick={() => setValue("most viewed")}
          >
            Most viewed
          </button>
        </div>
        <div>
          {isLoading ? (
            <div
              style={{ width: "100px" }}
              className="flex items-center justify-center mx-auto"
            >
              <Lottie loop={true} animationData={Loading} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 785:grid-cols-3 1097:grid-cols-4 gap-6">
              {displayBooks.map((item, index) => {
                const thumbnail = item.volumeInfo?.imageLinks?.smallThumbnail;

                return thumbnail && item.volumeInfo.description ? (
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
          )}
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}

export default Books;
