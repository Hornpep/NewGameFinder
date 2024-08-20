import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [upcomingGames, setUpcomingGames] = useState([]);

    useEffect(() => {
        fetchUpcomingGames();
    }, []);

    const fetchUpcomingGames = async () => {
        try {
            const response = await axios.get('/api/upcoming-games'); // API-Endpunkt
            setUpcomingGames(response.data);
        } catch (error) {
            console.error('Error fetching upcoming games:', error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Upcoming Games</h1>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {upcomingGames.length ? (
                    upcomingGames.map(game => (
                        <div key={game.id} className="card bg-base-100 shadow-xl">
                            <figure>
                                <img src={game.cover_url} alt={game.name} className="rounded-t-lg" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{game.name}</h2>
                                <p className="text-gray-600">Release Date: {new Date(game.release_date * 1000).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-lg text-center col-span-full">No upcoming games found.</p>
                )}
            </section>
        </div>
    );
};

export default Home;
