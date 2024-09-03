import React from 'react';
import { useEffect, useState } from 'react';

const Wishlist = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/games') // HIER an BE anbinden
      .then((response) => {
        if (!response.ok) {
          throw new Error('Netzwerkantwort war nicht ok');
        }

        return response.json();
      })
      .then((data) => {
        setData(data); // data =  Array von Objekten

        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#141414]">
        <div className="relative w-24 h-24 animate-spin">
          <div className="absolute inset-0 border-4 border-t-transparent border-white rounded-full animate-[spin_1s_linear_infinite]"></div>
          <div className="absolute inset-0 border-4 border-t-transparent border-[#1CE0AF] rounded-full animate-[spin_2s_linear_infinite]"></div>
        </div>
        <span className="absolute text-white mt-32 text-lg tracking-wide font-bold">
          Finding games...
        </span>
      </div>
    );
  }

  if (error) {
    return <p>Fehler: {error.message}</p>;
  }

  return (
    <div className="min-h-screen bg-[#141414]  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5   gap-14 p-28  w-full  dark:text-white">
      <div className="relative h-[30vh] w-full flex items-center justify-center bg-cover bg-center">
          <div className="relative z-10 text-center px-4">
            <h2 className="text-5xl font-bold mb-4 text-primary-500">
              Your wishlist
            </h2>
            <p className="text-xl font-light">
              Here you can find all the games you added to your wishlist
            </p>
          </div>
        </div>
      
      
      {data.map((item, index) => (
        <div
          key={index}
          className="item relative  border border-gray-700 hover:border-2 hover:border-[#1DD0E0] rounded-lg  w-1/10 min-w-[200px] h-80 bg-[#141414] "
          onClick={() => (window.location.href = `/GameDetails?id=${item.id}`)}
        >
          {/* Neue Seite mit Übergabe der ID öffnen - Achtung !! anpassen auf GameID */}

          <div
            className="absolute inset-0 bg-contain bg-center bg-no-repeat rounded-lg"
            style={{ backgroundImage: `url(${item.cover_url})` }}
          ></div>
          <div className="absolute inset-0 bg-[#141414] bg-opacity-50 rounded-lg"></div>
          <button
            className="absolute top-2 right-2 z-20 text-[#1CE0AF]"
            aria-label="Toggle Heart"
          >
            ❤️
          </button>
          <div className="absolute bottom-0 w-full flex justify-center items-end">
            <h2 className="relative z-10 text-lg font-semibold text-center  text-[#1CE0AF] mt-auto p-4">
              {item.name}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
