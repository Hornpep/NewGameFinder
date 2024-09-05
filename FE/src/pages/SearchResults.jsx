// pages/SearchResults.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  //const [cover, setCover] = useState();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('search'); // Extrahiert die Suchanfrage

  useEffect(() => {
    if (query) {
      fetchResults(query); // Ruft die Ergebnisse für die aktuelle Suchanfrage ab
    }
  }, [query]);

  // Funktion, die eine Pause erstellt
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchResults = async (searchQuery) => {
    try {
      //setResults([]);

      //console.log('test');
      // Sende eine Anfrage an das Backend, um Suchergebnisse zu erhalten
      const response = await axios.get(
        `http://localhost:8080/search?search=${searchQuery}`
      );
      const results = response.data.slice(0, 4);

      //console.log(results);

      // Setze die erhaltenen Ergebnisse (in deinem Frontend-State-Management, z.B. setState, useState)
      const test = []; // Array für Namen aus fetch

      const fetchedCover = await Promise.all(
        results.map(async (el) => await fetchCover(el.id))
      );

      //console.log('cover:', fetchedCover);

      // Setzt den Cover-State, wenn nötig, dies aber beeinflusst nicht den weiteren Code
      //setCover(fetchedCover);

      results.forEach((result, index) => {
        let cover = fetchedCover[index][0].url;

        cover = cover.replace('thumb', 'cover_big');
        console.log('cover:', cover);

        test.push({
          name: result.name,
          id: result.id,
          //url: fetchedCover[index][0].url,
          url: cover,
        }); // Objekt mit name und id hinzufügen
      });
      //console.log(test);
      setResults(test);
    } catch (error) {
      console.error('Fehler beim Abrufen der Suchergebnisse:', error);
    }
  };

  //console.log('Test length:', test);

  const fetchCover = async (searchQuery) => {
    try {
      //console.log('test');
      // Sende eine Anfrage an das Backend, um Suchergebnisse zu erhalten
      const response = await axios.get(
        `http://localhost:8080/searchCoverById?id=${searchQuery}`
      );
      const result = response.data;
      //console.log('ResultCover:', result);
      // Setze die erhaltenen Ergebnisse (in deinem Frontend-State-Management, z.B. setState, useState)
      //setCover(result);
      sleep(500); // Macht 1sec Pause :)
      return result;
    } catch (error) {
      console.error('Fehler beim Abrufen der Suchergebnisse:', error);
      // Optional: Fehlerbehandlung anzeigen
    }
  };

  if (results < 1) {
    return (
      <div className="flex items-center justify-center min-h-screen p-28 bg-[#141414]">
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

  return (
    <div className="min-h-screen bg-[#141414] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5   gap-14 p-28  w-full  dark:text-white">
      <div className="relative h-[30vh] w-full flex items-center justify-center bg-cover bg-center">
        <div className="relative z-10 text-center px-4">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Search results for: <span className="text-[#1CE0AF]">{query}</span>
          </h2>
        </div>
      </div>

      {results.map((result, index) => (
        <div
          key={index}
          className="item relative border  border-gray-700 hover:border-2 hover:border-[#1DD0E0] rounded-lg w-1/10 min-w-[200px] h-80 bg-[#141414] "
          onClick={() =>
            (window.location.href = `/GameDetails?id=${result.id}`)
          } // Neue Seite mit Übergabe der ID öffnen
        >
          <div className="relative h-full w-full flex items-center justify-center">
            <div
              className="bg-contain bg-center bg-no-repeat rounded-lg flex-grow"
              style={{
                backgroundImage: `url(${
                  result.url ||
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
            className="absolute top-2 right-2 z-20 text-black hidden"
            aria-label="Toggle Heart"
            onClick={(e) => e.stopPropagation()} // Verhindert das Auslösen des Klicks auf dem Eltern-Element
          >
            ❤️
          </button>
          <div className="absolute bottom-0 w-full flex  justify-center flex-col  ">
            <h2 className="relative z-10 text-lg  font-semibold text-center w-full text-[#1CE0AF] mt-auto p-4">
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
