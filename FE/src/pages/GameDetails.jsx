import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Gamedetails = () => {
  const [results, setResults] = useState([]);
  const [cover, setCover] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('id'); // Extrahiert die Suchanfrage

  //console.log(query);

  useEffect(() => {
    if (query) {
      fetchResults(query); // Ruft die Ergebnisse für die aktuelle Suchanfrage ab
    }
  }, [query]);

  const fetchResults = async (searchQuery) => {
    try {
      // Sende eine Anfrage an das Backend, um Suchergebnisse zu erhalten
      const response = await axios.get(
        `http://localhost:8080/searchGameById?id=${searchQuery}`
      );
      const result = response.data;

      // Setze die erhaltenen Ergebnisse (in deinem Frontend-State-Management, z.B. setState, useState)
      setResults(result);

      //console.log(result);

      fetchCover(result[0].id); // Cover Bild abrufen
    } catch (error) {
      console.error('Fehler beim Abrufen der Suchergebnisse:', error);
      // Optional: Fehlerbehandlung anzeigen
    }
  };

  /*   if (results.length > 1)
    return (
      <div className="p-28">
        <p className="text-red-600 bold text-6xl">Loading...</p>
      </div>
    ); */

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
      setCover(result);
    } catch (error) {
      console.error('Fehler beim Abrufen der Suchergebnisse:', error);
      // Optional: Fehlerbehandlung anzeigen
    }
  };

  const addToWishlist = async () => {
    console.log('result id:', results[0].id);
    // Daten, die an den Server gesendet werden sollen

    const wishlistData = {
      users_id: 15,
      igdb_id: results[0].id, // Beispielwert für igdb_id
      name: `${results[0].name}`, // Beispielwert für name
      cover_url: `${cover[0].url}`, // Beispielwert für cover_url
      genre: 'Action', // Beispielwert für genre
      release_date: '2024-09-02T00:00:00Z', // Beispielwert für release_date
      platform: 'PC', // Beispielwert für platform
      involved_companies: 'Company Name', // Beispielwert für involved_companies
      about: 'This is an amazing game.', // Beispielwert für about
    };

    try {
      // Fetch-Aufruf zur Übergabe der Daten an den Server
      const response = await fetch('http://localhost:8080/wishlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wishlistData), // Daten in JSON-Format umwandeln
      });

      if (!response.ok) {
        throw new Error('Fehler beim Hinzufügen zur Wishlist');
      }

      alert('Zur Wishlist hinzugefügt');
    } catch (error) {
      alert(`Fehler: ${error.message}`);
    }
  };

  /*   if (cover.length < 1)
    return (
      <div className="p-28">
        <p>Loading...</p>
      </div>
    ); */

  return (
    <div className="flex min-h-screen bg-[#141414] justify-center ">
      <div className="flex h-full  bg-[#141414]  p-28 w-1/2 justify-center">
        <div className="flex  rounded-md justify-center text-center">
          <div>
            {results[0]?.name && cover[0]?.url ? (
              <div className="flex border p-2 border-[#1DD0E0] flex-col">
                <h2 className=" text-center py-2 border border-[#1DD0E0] rounded-md text-white font-extrabold text-3xl">
                  {results[0].name}
                </h2>
                <div className="w-full items-center justify-center flex flex-col  py-2">
                  <img
                    className=" w-1/2  rounded-md  border-black  border-2"
                    src={cover[0].url}
                  ></img>
                </div>
                <div className="flex flex-row">
                  <div className="flex flex-col  py-2">
                    <div className="md-2 space-y-2 mb-2">
                      <button
                        onClick={addToWishlist}
                        className="p-2 justify-center  text-white border bg-[#141414] rounded-md border-[#1CE0AF] flex flex-col items-center "
                      >
                        <span className="text-sm">Add to</span>
                        <span className="text-lg font-bold">Wishlist</span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-row p-2  justify-center">
                      <p className="text-white border w-full text-xl rounded-md border-[#1CE0AF]">
                        {results[0].summary}
                      </p>
                    </div>
                    <div className="flex flex-row p-2   justify-center">
                      <div className="flex flex-col p-2 gap-y-2 w-full">
                        <p className="text-white border rounded-md  border-[#1CE0AF]">
                          Genre: Strategie
                        </p>
                        <p className="text-white border  rounded-md border-[#1CE0AF]">
                          Release Date: 20.02.2000
                        </p>
                        <p className="text-white border rounded-md  border-[#1CE0AF]">
                          Developer: Suno Tec Studio
                        </p>
                        <p className="text-white border rounded-md  border-[#1CE0AF]">
                          Publisher: Sony
                        </p>
                      </div>
                      <div className="flex flex-col p-2 gap-y-2 w-full">
                        <p className="text-white border rounded-md  border-[#1CE0AF]">
                          Rating: {Math.round(results[0].rating) / 10} /10
                        </p>
                        <p className="text-white border  rounded-md border-[#1CE0AF]">
                          IGDB Id: {results[0].id}
                        </p>
                        <p className="text-white border  rounded-md border-[#1CE0AF]">
                          Age Rating: USK 12
                        </p>
                        <p className="text-white border  rounded-md border-[#1CE0AF]">
                          Languages: Deutsch
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-screen bg-[#141414]">
                <div className="relative w-24 h-24 animate-spin">
                  <div className="absolute inset-0 border-4 border-t-transparent border-white rounded-full animate-[spin_1s_linear_infinite]"></div>
                  <div className="absolute inset-0 border-4 border-t-transparent border-[#1CE0AF] rounded-full animate-[spin_2s_linear_infinite]"></div>
                </div>
                <span className="absolute text-white mt-32 text-lg tracking-wide font-bold">
                  NextGameFinder lädt...
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamedetails;
