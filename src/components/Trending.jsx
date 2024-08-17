import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Loading from "../assets/imgs/loading.json";
import Lottie from "lottie-react";
import SpecialOffers from "./SpecialOffers";

function Trending() {
  const [trending, setTrending] = useState([]);
  const [displayBooks, setDisplayBooks] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  // api for google book
  const googleBookApiKey = import.meta.env.VITE_GOOGLE_BOOK_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=trending&key=${googleBookApiKey}&maxResults=10`
      )
      .then((response) => {
        const books = response.data.items || [];
        setIsloading(false);
        setTrending(books);
        // Randomly select 8 books from the fetched data
        const randomBooks = books.sort(() => 0.5 - Math.random()).slice(0, 8);
        setDisplayBooks(randomBooks);
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  }, []);

  return (
    <div className="trending-section p-6 bg-gray-100 flex flex-col items-center w-[100%]">
      <h1 className=" font-mono font-bold text-[#93622A] text-[24px] 785:text-4xl mt-[110px] mb-5 p-5">
        Trending Books
      </h1>

      {isLoading ? (
        <div
          style={{ width: "100px" }}
          className="flex items-center justify-center mx-auto"
        >
          <Lottie loop={true} animationData={Loading} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 785:grid-cols-3 1097:grid-cols-4 gap-6 ">
          {displayBooks.map((item, index) => {
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
      )}
      <div>{/* <SpecialOffers /> */}</div>
    </div>
  );
}

export default Trending;
