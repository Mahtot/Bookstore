import { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import { BookContext } from "../context/BookContext";
import "../assets/styles.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Lottie from "lottie-react";
import Loading from "../assets/imgs/loading.json";

function SearchResults() {
  const { searchedBooks } = useContext(BookContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (searchedBooks) {
      setIsLoading(false);
    }
  }, [searchedBooks]);

  return (
    <div className="w-full flex flex-col gap-10">
      <Header />

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[70vh]">
          <div style={{ width: "200px" }}>
            <Lottie loop={true} animationData={Loading} />
          </div>
        </div>
      ) : searchedBooks.length > 0 ? (
        <div className="search flex flex-col items-center py-10 w-[100%] mx-auto min-h-[100vh]">
          <h1 className=" font-mono font-bold text-[#93622A] text-[24px] 785:text-4xl mb-5 p-5">
            Search results
          </h1>
          <div className="grid grid-cols-2 785:grid-cols-4 gap-5 p-4">
            {searchedBooks.map((item, index) => {
              const thumbnail = item.volumeInfo?.imageLinks?.smallThumbnail;

              if (thumbnail) {
                return (
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
                );
              }
              return null;
            })}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[70vh]">
          <h2 className="text-center text-lg text-gray-600">
            Enter a title to search
          </h2>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default SearchResults;
