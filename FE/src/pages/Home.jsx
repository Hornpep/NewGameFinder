import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [games, setGames] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        // API-Anfrage, um die kommenden Spiele zu holen
        const response = await axios.get('http://localhost:8080/all-games'); 
        setGames(response.data); 
        setLoading(false); 
      } catch (error) {
        // Fehlerbehandlung
        console.error('Error fetching games:', error);
        setError('Failed to load games');
        setLoading(false); 
      }
    };

    fetchGames(); 
  }, []); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#141414] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-14 p-28 w-full dark:text-white">
      <h2 className="text-xl mb-4">All Games</h2>
      {games.map((game, index) => (
        <div
          key={index}
          className="item relative border-12 border-black hover:border-4 hover:border-[#1DD0E0] rounded-lg w-1/10 min-w-[200px] h-80 bg-[#141414]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${game.cover_url})` }} // TODO: Hierfür muss noch ein separater Endpunkt angesteuert werden, um das Cover zu holen
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
  );
};

export default Home;
