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
    return <p>Lade...</p>;
  }

  if (error) {
    return <p>Fehler: {error.message}</p>;
  }

  return (
    <div className="min-h-screen bg-[#141414]  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5   gap-14 p-28  w-full  dark:text-white">
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
