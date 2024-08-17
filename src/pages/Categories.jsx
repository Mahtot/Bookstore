import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import Loading from "../assets/imgs/loading.json";
import Lottie from "lottie-react";
import Card from "../components/Card";

function Categories() {
  const categories = ["Fiction", "Mystery", "Romance", "Non-fiction", "Comedy"];
  const [value, setValue] = useState("Fiction");
  const [isLoading, setIsLoading] = useState(true);
  const [displayBooks, setDisplayBooks] = useState([]);

  // api for google book
  const googleBookApiKey = import.meta.env.VITE_GOOGLE_BOOK_API_KEY;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${value}&key=${googleBookApiKey}&maxResults=10`
      )
      .then((response) => {
        const books = response.data.items || [];
        setIsLoading(false);
        const randomBooks = books.sort(() => 0.5 - Math.random()).slice(0, 8);
        setDisplayBooks(randomBooks);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [value]);

  return (
    <div className="flex flex-col gap-10 w-full">
      <Header />
      <div className="flex flex-col md:flex-row justify-center gap-10 p-10 mx-auto max-w-screen-xl">
        <div className="flex flex-col border-b-2 md:border-b-0 md:border-r-2 gap-10 md:pr-10">
          <h1 className="font-mono font-bold text-[#93622A] text-[20px] mb-5 mt-[-20px]">
            Categories
          </h1>
          {categories.map((item, index) => (
            <button
              key={index}
              onClick={() => setValue(item)}
              className={`${
                value === item
                  ? "text-gray-900 border-b-2 border-gray-200"
                  : "hover:text-gray-900 hover:border-b"
              } border-t-0 border-l-0 border-r-0 transition-all p-2 text-left`}
            >
              {item}
            </button>
          ))}
        </div>
        {isLoading ? (
          <div
            style={{ width: "100px" }}
            className="flex items-center justify-center mx-auto"
          >
            <Lottie loop={true} animationData={Loading} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
      <Footer />
    </div>
  );
}

export default Categories;
