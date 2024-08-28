import Game from '../models/Game.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Get all Games
export const getAllGames = async (req, res) => {
  try {
    const games = await Game.findAll();
    return res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Game by ID
export const getGameById = async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchAllGames = async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.igdb.com/v4/games/',
      `fields name,category,cover,first_release_date,genres,involved_companies,name,platforms,summary; 
      limit 10;`,
      {
        method: 'POST',
        headers: {
          'Client-ID': process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
        },
      }
    );
    const allGames = response.data;

    res.json(allGames);
    res.status(200).json({ message: 'Games fetched successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from IGDB' });
  }
};

export const fetchUpcomingGames = async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.igdb.com/v4/release_dates/',
      `fields *; where game.platforms = 48 & date > 1538129354; sort date asc;`,
      {
        method: 'POST',
        headers: {
          'Client-ID': process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
        },
      }
    );
    const upcomingGames = response.data;

    res.json(upcomingGames);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch upcoming games from IGDB' });
  }
};

export const fetchSearch = async (req, res) => {
  try {
    const searchQuery = req.query.search || 'Call of Duty';

    const response = await axios.post(
      'https://api.igdb.com/v4/games',
      `fields * ; search "${searchQuery}"; limit 10; `,

      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Client-ID': process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
        },
      }
    );
    const searchResults = response.data;

    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Search from IGDB' });
  }
};

/* const response = await axios.post(
  'https://api.igdb.com/v4/covers',
  `fields * ; where game = 115032; `, // Füge den Suchparameter hier hinzu */
