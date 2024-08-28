import {React, useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
const [data, setData] = useState([]); 
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    const fetchGames = async () => {
        try {
        const response = await axios.get('http://localhost:8080/games'); 
        setData(response.data); 
        setLoading(false); 
        } catch (error) {
        console.error('Error fetching games:', error);
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
    <div className="bg-[#141414] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-14 p-28 w-full dark:text-white">
        {data.map((item, index) => (
        <div
            key={index}
            className="item relative border-12 border-black hover:border-4 hover:border-[#1DD0E0] rounded-lg w-1/10 min-w-[200px] h-80 bg-[#141414]"
        >
            <div
            className="absolute inset-0 bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${item.cover_url})` }}
            ></div>
            <div className="absolute inset-0 bg-[#141414] bg-opacity-50 rounded-lg"></div>
            <button
            className="absolute top-2 right-2 z-20 text-[#1CE0AF]"
            aria-label="Toggle Heart"
            >
            ❤️
            </button>
            <div className="absolute bottom-0 w-full flex justify-center items-end">
            <h2 className="relative z-10 text-lg font-semibold text-center text-[#1CE0AF] mt-auto p-4">
                {item.name}
            </h2>
            </div>
        </div>
        ))}
    </div>
    );
};

export default Home;