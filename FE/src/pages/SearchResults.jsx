// pages/SearchResults.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('search'); // Extrahiert die Suchanfrage

  useEffect(() => {
    if (query) {
      fetchResults(query); // Ruft die Ergebnisse für die aktuelle Suchanfrage ab
    }
  }, [query]);

  const fetchResults = async (searchQuery) => {
    try {
      //console.log('test');
      // Sende eine Anfrage an das Backend, um Suchergebnisse zu erhalten
      const response = await axios.get(
        `http://localhost:8080/search?search=${searchQuery}`
      );
      const results = response.data;
      //console.log(results);
      // Setze die erhaltenen Ergebnisse (in deinem Frontend-State-Management, z.B. setState, useState)
      setResults(results);
    } catch (error) {
      console.error('Fehler beim Abrufen der Suchergebnisse:', error);
      // Optional: Fehlerbehandlung anzeigen
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5   gap-14 p-28  w-full  dark:text-white">
      <h2 className="text-xl mb-4">
        Suchergebnisse für: <span className="text-[#1CE0AF]">{query}</span>
      </h2>

      {results.map((result, index) => (
        <div
          key={index}
          className="item relative border-12 border-black hover:border-4 hover:border-[#1DD0E0] rounded-lg w-1/10 min-w-[200px] h-80 bg-[#141414] "
          onClick={() =>
            (window.location.href = `/GameDetails?id=${result.id}`)
          } // Neue Seite mit Übergabe der ID öffnen
        >
          <div
            className="absolute inset-0 bg-contain bg-center bg-no-repeat rounded-lg"
            style={{
              backgroundImage: `url(${
                result.cover_url ||
                'https://www.igdb.com/packs/static/igdbLogo-bcd49db90003ee7cd4f4.svg'
              })`,
            }}
          ></div>
          <div className="absolute inset-0 bg-[#141414] bg-opacity-50 rounded-lg"></div>
          <button
            className="absolute top-2 right-2 z-20 text-[#1CE0AF]"
            aria-label="Toggle Heart"
            onClick={(e) => e.stopPropagation()} // Verhindert das Auslösen des Klicks auf dem Eltern-Element
          >
            ❤️
          </button>
          <div className="absolute bottom-0 w-full flex flex-col justify-center items-end text-center">
            <h2 className="relative z-10 text-lg font-semibold text-center w-full text-[#1CE0AF] mt-auto p-4">
              {result.name}
            </h2>
            {/*             <h2 className="relative z-10 text-lg font-semibold text-center justify-center w-full text-[#1CE0AF] mt-auto p-4">
              Game-Id: {result.id}
            </h2> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;

{
  /* <div className="min-h-screen bg-[#141414] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5   gap-14 p-28  w-full  dark:text-white">
           <h2 className="text-xl mb-4">
        Suchergebnisse für: <span className="text-[#1CE0AF]">{query}</span>
      </h2>
  
  
  {data.map((result, index) => (
        <div
          key={index}
          className="item relative border-12 border-black  hover:border-4 hover:border-[#1DD0E0] rounded-lg  w-1/10 min-w-[200px] h-80 bg-[#141414] "
        >
          <div
            className="absolute inset-0 bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${result.cover_url})` }}
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
              {result.name}
            </h2>
                    <h2 className="relative z-10 text-lg font-semibold text-center  text-[#1CE0AF] mt-auto p-4">
              {result.id}
            </h2>
          </div>
        </div>
      ))}
    </div> */
}
