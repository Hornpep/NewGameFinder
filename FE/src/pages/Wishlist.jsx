import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Wishlist = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    fetch('http://localhost:8080/wishlists') // HIER an BE anbinden
      .then((response) => {
        if (!response.ok) {
          throw new Error('Netzwerkantwort war nicht ok');
        }

        return response.json();
      })
      .then((data) => {
        setData(data); // data =  Array von Objekten
        console.log('data in wishlist:', data);
        setLoading(false);
        toast.info('Click on the Heart if you want to break it.');
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
          NextGameFinder lädt...
        </span>
      </div>
    );
  }

  const deleteGame = async (searchQuery) => {
    try {
      console.log('sq:', searchQuery);
      console.log(typeof searchQuery);

      // Sende eine Anfrage an das Backend, um Suchergebnisse zu erhalten
      const response = await axios.delete(
        `http://localhost:8080/wishlists/${searchQuery}`
      );
      const result = response.data;
      //console.log('ResultCover:', result);
      toast.info('Game deleted!');
      await sleep(1000);
      return window.location.reload();
    } catch (error) {
      console.error('Fehler beim Abrufen der Suchergebnisse:', error);
      // Optional: Fehlerbehandlung anzeigen
    }
  };

  if (error) {
    return <p>Fehler: {error.message}</p>;
  }

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-[#141414] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5   gap-14 p-28  w-full  dark:text-white">
        {data.map((item, index) => (
          <div
            key={index}
            className="item relative border  border-gray-700 hover:border-2 hover:border-[#1DD0E0] rounded-lg w-1/10 min-w-[200px] h-80 bg-[#141414] "
            onClick={() =>
              (window.location.href = `/GameDetails?id=${item.igdb_id}`)
            } // Neue Seite mit Übergabe der ID öffnen
          >
            <div className="relative h-full w-full flex items-center justify-center">
              <div
                className="bg-contain bg-center bg-no-repeat rounded-lg flex-grow"
                style={{
                  backgroundImage: `url(${
                    item.cover_url ||
                    'https://www.igdb.com/packs/static/igdbLogo-bcd49db90003ee7cd4f4.svg'
                  })`,
                  height: '50%', // Setzt das Bild auf die Hälfte der Höhe des Containers
                  width: '100%', // Passt die Breite an die des umgebenden Divs an
                  marginTop: '25%', // 1/4 des Platzes oben
                  marginBottom: '25%', // 1/4 des Platzes unten
                }}
              ></div>
            </div>
            <div className="absolute inset-0 bg-[#141414] opacity-0 rounded-lg"></div>
            <button
              className="absolute top-2 right-2 z-10 text-black "
              aria-label="Toggle Heart"
              onClick={(e) => {
                // Ändern zu Delete Button ?
                e.preventDefault();
                e.stopPropagation();
                deleteGame(item.id);
              }}
            >
              ❤️
            </button>
            <div className="absolute bottom-0 w-full flex  justify-center flex-col  ">
              <h2 className="relative z-10 text-lg  font-semibold text-center w-full text-[#1CE0AF] mt-auto p-4">
                {item.name}
              </h2>
              {/*             <h2 className="relative z-10 text-lg font-semibold text-center justify-center w-full text-[#1CE0AF] mt-auto p-4">
              Game-Id: {result.id}
            </h2> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Wishlist;
