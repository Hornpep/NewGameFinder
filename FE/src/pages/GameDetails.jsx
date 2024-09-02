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
      //console.log('test');
      // Sende eine Anfrage an das Backend, um Suchergebnisse zu erhalten
      const response = await axios.get(
        `http://localhost:8080/searchGameById?id=${searchQuery}`
      );
      const result = response.data;
      //console.log('Results:', result);
      // Setze die erhaltenen Ergebnisse (in deinem Frontend-State-Management, z.B. setState, useState)
      setResults(result);
      //console.log('results.name:', result[0].name);
      fetchCover(result[0].id); // Cover Bild abrufen
      //console.log('Restult ID:', result[0].id);
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

  /*   if (cover.length < 1)
    return (
      <div className="p-28">
        <p>Loading...</p>
      </div>
    ); */

  return (
    <div className="flex min-h-screen bg-[#141414] justify-center ">
      <div className="flex h-full  bg-[#141414]  p-28 w-1/2 justify-center">
        <div className="flex border p-2 border-[#1DD0E0] rounded-md justify-center text-center">
          <div className="flex flex-col">
            {results[0]?.name && cover[0]?.url ? (
              <>
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
                      <button className="p-2 justify-center  text-white border bg-[#141414] rounded-md border-[#1CE0AF] flex flex-col items-center ">
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
                          Genre: Text
                        </p>
                        <p className="text-white border  rounded-md border-[#1CE0AF]">
                          Release Date: Text
                        </p>
                        <p className="text-white border rounded-md  border-[#1CE0AF]">
                          Developer: Text
                        </p>
                        <p className="text-white border rounded-md  border-[#1CE0AF]">
                          Publisher: Text
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
                          Age Rating: Text
                        </p>
                        <p className="text-white border  rounded-md border-[#1CE0AF]">
                          Languages: Text
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#1CE0AF]"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamedetails;
