import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Gamedetails = () => {
  const [results, setResults] = useState([]);
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
        `http://localhost:8080/search?search=${searchQuery}`
      );
      //const results = response.data;
      console.log(results);
      // Setze die erhaltenen Ergebnisse (in deinem Frontend-State-Management, z.B. setState, useState)
      setResults(results);
    } catch (error) {
      console.error('Fehler beim Abrufen der Suchergebnisse:', error);
      // Optional: Fehlerbehandlung anzeigen
    }
  };

  return (
    <div className="flex min-h-screen bg-[#141414] justify-center ">
      <div className="flex h-full  bg-[#141414]  p-28 w-1/2 justify-center">
        <div className="flex border p-2 border-[#1DD0E0] rounded-md justify-center text-center">
          <div className="flex flex-col">
            <h2 className="underline text-center py-2 border rounded-md text-white font-extrabold text-3xl">
              {results.name || 'GameName'}
            </h2>
            <div className="flex flex-col  py-2">
              <img
                className=" rounded-md  border-black  border-2"
                src="https://media.rawg.io/media/resize/420/-/screenshots/5aa/5aaff742f85c733ab675e934b41d4e7b.jpg"
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
                    Story: In der finsteren Welt von Diablo 4 durchstreift der
                    einsame Held die Ruinen einer verwüsteten Stadt, die von
                    dämonischen Kreaturen überrannt wurde, während ein
                    unheilvolles Glühen den Himmel blutrot färbt. Überall lauern
                    Gefahren, und der Boden ist übersät mit den Überresten
                    vergangener Schlachten, doch im Herzen der Dunkelheit brennt
                    ein Funke Hoffnung, als der Held ein uraltes Artefakt
                    entdeckt, das ihm die Macht verleiht, die Dämonenlords
                    herauszufordern. Getrieben von Rache und dem Willen, die
                    Menschheit vor der ewigen Verdammnis zu bewahren, stürzt er
                    sich in die Tiefen der Hölle, wo die wahre Schlacht erst
                    beginnt.
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
                      Rating: Text
                    </p>
                    <p className="text-white border  rounded-md border-[#1CE0AF]">
                      IGDB Id:: Text
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamedetails;
