import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Home = () => {
  const [games, setGames] = useState([]);
  const [upcomingGames, setUpcomingGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ref für die Coming Soon-Sektion
  const comingSoonRef = useRef(null);

  useEffect(() => {
    fetchGames();
    fetchUpcomingGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get("http://localhost:8080/all-games");
      const results = response.data.slice(0, 4); // Begrenze die Anzahl der Spiele auf 9

      const gamesWithCovers = await Promise.all(
        results.map(async (game) => {
          const cover = await fetchCover(game.id);
          return { ...game, cover_url: cover ? cover.url : null };
        })
      );

      setGames(gamesWithCovers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching games:", error);
      setError("Error fetching games: " + error.message);
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
      console.error("Fehler beim Abrufen der Covers:", error);
      return null;
    }
  };

  const fetchUpcomingGames = async () => {
    try {
      const response = await axios.get("http://localhost:8080/upcoming-games");
      const results = response.data;

      const gamesWithCovers = await Promise.all(
        results.map(async (game) => {
          const cover = await fetchCover(game.id);
          return { ...game, cover_url: cover ? cover.url : null };
        })
      );

      setUpcomingGames(gamesWithCovers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching upcoming games:", error);
      setError("Error fetching upcoming games: " + error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#141414]">
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

  if (error) {
    return <div className="p-28 bg-[#141414] text-white h-screen">{error}</div>;
  }

  // Funktion für den Button, um zur Coming Soon-Sektion zu scrollen
  const scrollToComingSoon = () => {
    comingSoonRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#141414] min-h-screen w-full dark:text-white">
      {/* Hero Section */}
      <div
        className="hero-section relative h-[60vh] w-full flex items-center justify-center bg-cover bg-center text-white"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/159204/game-controller-joystick-joypad-gamepad-159204.jpeg')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Nextgamefinder</h1>
          <p className="text-xl font-light">Find your next game to play</p>
          <button
            onClick={scrollToComingSoon}
            className="mt-4 px-8 py-3 bg-[#1CE0AF] text-black font-bold rounded-lg"
          >
            Explore Now
          </button>
        </div>
      </div>

      {/* Upcoming Games Section */}
      <div
        ref={comingSoonRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-14 px-28 py-20"
      >
        <div className="relative h-[30vh] w-full flex items-center justify-center bg-cover bg-center">
          <div className="relative z-10 text-center px-4">
            <h2 className="text-5xl font-bold mb-4 text-primary-500">
              Coming Soon
            </h2>
            <p className="text-xl font-light">
              Upcoming games you don't want to miss
            </p>
          </div>
        </div>

        {upcomingGames.map((game, index) => (
          <div
            key={index}
            className="item relative border border-gray-700 hover:border-2 hover:border-[#1DD0E0] rounded-lg w-1/10 min-w-[200px] h-80 bg-[#141414]"
            onClick={() =>
              (window.location.href = `/GameDetails?id=${game.id}`)
            }
          >
            <div className="relative h-full w-full flex items-center justify-center">
              <div
                className="bg-contain bg-center bg-no-repeat rounded-lg flex-grow"
                style={{
                  backgroundImage: `url(${
                    game.cover_url ||
                    "https://www.igdb.com/packs/static/igdbLogo-bcd49db90003ee7cd4f4.svg"
                  })`,
                  height: "50%",
                  width: "100%",
                  marginTop: "25%",
                  marginBottom: "25%",
                }}
              ></div>
            </div>
            <div className="absolute inset-0 bg-[#141414] opacity-0 rounded-lg"></div>
            <button
              className="absolute top-2 right-2 z-20 text-black hidden"
              aria-label="Toggle Heart"
              onClick={(e) => e.stopPropagation()}
            >
              ❤️
            </button>
            <div className="absolute bottom-0 w-full flex justify-center flex-col">
              <h2 className="relative z-10 text-lg font-semibold text-center w-full text-[#1CE0AF] mt-auto p-4">
                {game.name}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Game Library Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-14 px-28 py-20">
        <div className="relative h-[30vh] w-full flex items-center justify-center bg-cover bg-center">
          <div className="relative z-10 text-center px-4">
            <h2 className="text-5xl font-bold mb-4 text-primary-500">
              Game Library
            </h2>
            <p className="text-xl font-light">
              Explore the best games from our collection
            </p>
          </div>
        </div>

        {games.map((game, index) => (
          <div
            key={index}
            className="item relative border border-gray-700 hover:border-2 hover:border-[#1DD0E0] rounded-lg w-1/10 min-w-[200px] h-80 bg-[#141414]"
            onClick={() =>
              (window.location.href = `/GameDetails?id=${game.id}`)
            }
          >
            <div className="relative h-full w-full flex items-center justify-center">
              <div
                className="bg-contain bg-center bg-no-repeat rounded-lg flex-grow"
                style={{
                  backgroundImage: `url(${
                    game.cover_url ||
                    "https://www.igdb.com/packs/static/igdbLogo-bcd49db90003ee7cd4f4.svg"
                  })`,
                  height: "50%",
                  width: "100%",
                  marginTop: "25%",
                  marginBottom: "25%",
                }}
              ></div>
            </div>
            <div className="absolute inset-0 bg-[#141414] opacity-0 rounded-lg"></div>
            <button
              className="absolute top-2 right-2 z-20 text-black hidden"
              aria-label="Toggle Heart"
              onClick={(e) => e.stopPropagation()}
            >
              ❤️
            </button>
            <div className="absolute bottom-0 w-full flex  justify-center flex-col  ">
              <h2 className="relative z-10 text-lg  font-semibold text-center w-full text-[#1CE0AF] mt-auto p-4">
                {game.name}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Section */}
      <div className="py-16 mb-16 bg-background-900 text-white text-center">
        <h2 className="text-4xl font-bold mb-4 text-primary-500">Why Choose Us?</h2>
        <p className="text-xl mb-8">
          We offer personalized recommendations, the latest game news, and an
          extensive library of titles.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
          <div>
            <h3 className="text-2xl font-semibold">Personalized Picks</h3>
            <p>Get games recommended just for you based on your tastes.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Latest News</h3>
            <p>Stay updated with the newest trends and game releases.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Vast Library</h3>
            <p>Explore a wide variety of games across all genres.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
