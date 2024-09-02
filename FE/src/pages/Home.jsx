import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get('http://localhost:8080/all-games');
      const results = response.data;

      // Hol die Cover für jedes Spiel
      const gamesWithCovers = await Promise.all(
        results.map(async (game) => {
          const cover = await fetchCover(game.id); // Hole das Cover für die spezifische Spiel-ID
          return { ...game, cover_url: cover ? cover.url : null }; // Füge die Cover-URL hinzu
        })
      );

      setGames(gamesWithCovers);
      setLoading(false);
    } catch (error) {
      // Fehlerbehandlung
      console.error('Error fetching games:', error);
      setError('Error fetching games: ' + error.message);
      setLoading(false);
    }
  };

  const fetchCover = async (game) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/searchCoverById?id=${game}`
      );
      const result = response.data;
      return result[0];
    } catch (error) {
      console.error('Fehler beim Abrufen der Covers:', error);
      return null;
    }
  };

  if (loading) {
    return (
      <div className="h-screen p-28 bg-[#141414] text-white">Loading...</div>
    );
  }

  if (error) {
    return <div className="p-28 bg-[#141414] text-white h-screen">{error}</div>;
  }

  return (
    <div className="bg-[#141414] min-h-screen w-full dark:text-white">
      {/* Hero Section */}
      <div
        className="hero-section relative h-[60vh] w-full flex items-center justify-center bg-cover bg-center text-white"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/159204/game-controller-joystick-joypad-gamepad-159204.jpeg')`,
        }} // Beispiel-URL für den Hero-Hintergrund
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Nextgamefinder</h1>
          <p className="text-xl font-light">Find your next game to play</p>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-14 p-28">
        <div className="relative h-[30vh] w-full flex items-center justify-center bg-cover bg-center text-[#1CE0AF]">
          <div className="relative z-10 text-center px-4">
            <h2 className="text-5xl font-bold mb-4">Game Library</h2>
            <p className="text-xl font-light">
              Explore the best games from our collection
            </p>
          </div>
        </div>

        {games.map((game, index) => (
          <div
            key={index}
            className="item relative border-10 border-black hover:border-4 hover:border-[#1DD0E0] rounded-lg w-full min-w-[200px] h-80 bg-[#141414]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url(${
                  game.cover_url ||
                  'https://www.igdb.com/packs/static/igdbLogo-bcd49db90003ee7cd4f4.svg'
                })`,
              }}
            ></div>
            <div className="absolute inset-0 bg-[#141414] bg-opacity-50 rounded-lg"></div>
            <button
              className="absolute top-2 right-2 z-20 text-[#1CE0AF]"
              aria-label="Toggle Heart"
            >
              ❤️
            </button>
            <div className="absolute bottom-0 w-full flex flex-col justify-center items-center text-center">
              <h2 className="relative z-10 text-lg font-semibold text-center text-[#1CE0AF] p-4">
                {game.name}
              </h2>
              <h2 className="relative z-10 text-md font-medium text-center text-[#1CE0AF] pb-4">
                Game-Id: {game.id}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
