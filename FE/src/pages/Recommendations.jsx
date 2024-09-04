import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Recommendations = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cover, setCover] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  // Daten aus der Wunschliste abrufen
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/wishlists');
        if (!response.ok) {
          throw new Error('Netzwerkantwort war nicht ok');
        }
        const result = await response.json();
        setData(result); // Daten aus dem Backend setzen
        //console.log('data:', data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Funktion zum Abrufen eines zufälligen Spiels und seiner Daten
  useEffect(() => {
    if (data.length > 0) {
      const randomGame = () => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomSimilarGame = data[randomIndex].similar_games[0];
        const idString = randomSimilarGame.toString();

        // Suchergebnisse abrufen
        const fetchResults = async (id) => {
          try {
            const response = await axios.get(
              `http://localhost:8080/searchGameById?id=${id}`
            );
            const result = response.data;
            setResults(result);
            console.log('Result:', result);
            fetchCover(result[0].id); // Cover Bild abrufen
          } catch (error) {
            console.error('Fehler beim Abrufen der Suchergebnisse:', error);
          }
        };

        // Cover Bild abrufen
        const fetchCover = async (id) => {
          try {
            const response = await axios.get(
              `http://localhost:8080/searchCoverById?id=${id}`
            );
            const result = response.data;
            console.log('result cover:', result);
            setCover(result);
          } catch (error) {
            console.error('Fehler beim Abrufen der Coverdaten:', error);
          }
        };

        fetchResults(idString);
      };

      randomGame();
    }
  }, [data]);

  const addToWishlist = async () => {
    console.log('result 0 gamedetails:', results[0]);
    // Daten, die an den Server gesendet werden sollen

    const wishlistData = {
      users_id: 15,
      igdb_id: results[0].id, // Beispielwert für igdb_id
      name: `${results[0].name}`, // Beispielwert für name
      cover_url: `${cover[0].url}`, // Beispielwert für cover_url
      genre: results[0].genres, // Beispielwert für genre
      release_date: '2024-09-02T00:00:00Z', // Beispielwert für release_date
      platform: results[0].platforms, // Beispielwert für platform
      involved_companies: [3], // Beispielwert für involved_companies
      similar_games: results[0].genres,
      //about: `${results[0].summary}`, // Beispielwert für about
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

      toast.success('Added to Wishlist');
    } catch (error) {
      alert(`Fehler: ${error.message}`);
    }
  };

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
                    <div className="md-2 space-y-2 mb-2 ">
                      <button
                        onClick={addToWishlist}
                        className="p-2 justify-center  text-white border bg-[#141414] rounded-md border-[#1CE0AF] flex flex-col items-center "
                      >
                        <span className="text-sm">Add to</span>
                        <span className="text-lg font-bold">Wishlist</span>
                      </button>
                    </div>
                    <div className="md-2 space-y-2 mb-2">
                      <button
                        onClick={() => window.history.back()}
                        className="w-full p-2 justify-center items-center text-white border bg-[#141414] rounded-md border-[#1CE0AF] flex"
                      >
                        <span className="text-lg font-bold items-center justify-center">
                          Back
                        </span>
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
                          Languages: German
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
                  NextGameFinder is loading...
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
