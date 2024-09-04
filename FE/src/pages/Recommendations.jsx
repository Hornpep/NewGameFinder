import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Recommendations = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cover, setCover] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [gameIds, setGameIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/wishlists');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        //console.log('Result Recommendations:', result);
        const gameIdsWish = result.map((item) => item.igdb_id);

        console.log('gameIdsWish:', gameIdsWish);
        setGameIds(gameIdsWish);
        setData(result);
        console.log('results:', result);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const randomGame = () => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomSimilarGame =
          data[randomIndex].similar_games[
            Math.floor(Math.random() * data[randomIndex].similar_games.length)
          ];

        const idString = randomSimilarGame.toString();

        if (gameIds.includes(randomSimilarGame)) {
          //toast.info('nicht anzeigen');
          return randomGame();
        }

        fetchResults(idString);
      };

      randomGame();
    }
  }, [data]);

  const fetchResults = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/searchGameById?id=${id}`
      );
      const result = response.data;
      setResults(result);

      if (result.length > 0) {
        fetchCover(result[0].id);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const fetchCover = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/searchCoverById?id=${id}`
      );
      setCover(response.data);
    } catch (error) {
      console.error('Error fetching cover:', error);
    }
  };

  const addToWishlist = async () => {
    if (gameIds.includes(results[0].id)) {
      toast.info('Already in Wishlist');
      await sleep(1500);
      return window.location.reload();
    }

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
      const response = await fetch('http://localhost:8080/wishlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wishlistData),
      });

      if (!response.ok) {
        throw new Error('Error adding game to wishlist');
      }

      toast.success('Added to Wishlist');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#141414] text-white">
        <div className="text-lg font-bold">Loading recommendations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#141414] text-white">
        <div className="text-lg font-bold">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-[#141414] min-h-screen p-28 text-white">
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    <div className="max-w-4xl mx-auto">
            {results[0] && cover[0] ? (
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-8">{results[0].name}</h1>
            <img src={cover[0].url} alt={results[0].name} className="mx-auto w-full max-w-md rounded-lg shadow-lg"/>
            <p className="mt-8">{results[0].summary || 'No description available.'}</p>
            <div className="mt-8">
              <button onClick={addToWishlist} className="bg-[#1CE0AF] text-black px-4 py-2 rounded-md shadow hover:bg-[#17a2b8]">Add to Wishlist</button>
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
        
  );
};

export default Recommendations;
