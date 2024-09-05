import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const GameDetails = () => {
  const [results, setResults] = useState([]);
  const [cover, setCover] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('id');
  const [gameIds, setGameIds] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      fetchResults(query);
    }
  }, [query]);

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

        console.log('gameIdsWish gameditails:', gameIdsWish);
        setGameIds(gameIdsWish);
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchResults = async (searchQuery) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/searchGameById?id=${searchQuery}`
      );
      setResults(response.data);

      if (response.data[0]) fetchCover(response.data[0].id);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const fetchCover = async (gameId) => {
    if (!gameId) return;
    try {
      const response = await axios.get(
        `http://localhost:8080/searchCoverById?id=${gameId}`
      );
      console.log('response.data GameDetails:', response.data);
      let cover_big = response.data[0].url;

      let newCover = cover_big.replace('thumb', 'cover_big');

      console.log('newCover:', newCover);

      //setCover(response.data);
      setCover(newCover);
    } catch (error) {
      console.error('Error fetching cover:', error);
    }
  };

  const showInfoToast = () => {
    toast.info('Added it to your wishlist.!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: '#000000', // Schwarzer Hintergrund
        color: '#1CE0AF', // Schriftfarbe
        borderRadius: '5px',
      },
    });
  };

  const addToWishlist = async () => {
    if (gameIds.includes(results[0].id)) {
      toast.info('Already in Wishlist');
      await sleep(1500);

      return;
    }
    // Daten, die an den Server gesendet werden sollen
    /*     let cover_big = cover[0].url;

    let newCover = cover_big.replace('thumb', 'cover_big');

    console.log('newCover:', newCover); */

    const wishlistData = {
      users_id: 15,
      igdb_id: results[0].id, // Beispielwert für igdb_id
      name: `${results[0].name}`, // Beispielwert für name
      //cover_url: `${cover[0].url}`, // Beispielwert für cover_url
      cover_url: cover,
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
        throw new Error('Error adding game to wishlist');
      }

      //toast.success('Added to wishlist successfully!');
      showInfoToast();
      await sleep(1500);
      window.location.reload();
    } catch (error) {
      alert(`Fehler: ${error.message}`);
    }
  };

  if (!results.length || !cover.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#141414] text-white">
        <div className="text-lg font-bold">Loading game details...</div>
      </div>
    );
  }

  const game = results[0];
  const gameCover =
    cover ||
    'https://www.igdb.com/packs/static/igdbLogo-bcd49db90003ee7cd4f4.svg';

  return (
    <div className="bg-[#141414] min-h-screen p-28 text-white">
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-4">{game.name}</h1>
          <img
            src={gameCover}
            alt={game.name}
            className="mx-auto w-full max-w-lg rounded-lg shadow-lg"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <button
            onClick={addToWishlist}
            className="bg-[#1CE0AF] text-black px-4 py-2 rounded-md shadow hover:bg-[#17a2b8]"
          >
            Add to Wishlist
          </button>
          <button
            onClick={() => window.history.back()}
            className="bg-gray-600 text-white px-4 py-2 rounded-md shadow hover:bg-gray-500"
          >
            Back
          </button>
          <div>
            <h2 className="text-3xl font-semibold mb-3">Game Details</h2>
            <p>{game.summary || 'No description available.'}</p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-3">Game Information</h2>
            <ul>
              <li>Genre: {game.genres?.join(', ') || 'N/A'}</li>
              <li>
                Release Date:{' '}
                {game.release_date
                  ? new Date(game.release_date).toLocaleDateString()
                  : 'N/A'}
              </li>
              <li>
                Rating:{' '}
                {game.rating ? `${(game.rating / 10).toFixed(1)}/10` : 'N/A'}
              </li>
              <li>Platform: {game.platforms?.join(', ') || 'N/A'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
