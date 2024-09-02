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
      'https://api.igdb.com/v4/games',
      `fields *; 
      limit 14;`,
      {
        headers: {
          'Client-ID': process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
        },
      }
    );
    const allGames = response.data;

    res.json(allGames);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch from IGDB', details: error.message });
  }
};

export const fetchUpcomingGames = async (req, res) => {
  try {
    const currentTime = Math.floor(Date.now() / 1000);
    const response = await axios.post(
      'https://api.igdb.com/v4/release_dates/',
      `fields *; date > ${currentTime}; sort date asc;
      limit 4;`,
      {
        headers: {
          'Client-ID': process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
        },
      }
    );
    const upcomingGames = response.data;

    res.json(upcomingGames);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch from IGDB', details: error.message });
  }
};

export const fetchSearch = async (req, res) => {
  try {
    const searchQuery = req.query.search || 'Call of Duty';

    const response = await axios.post(
      'https://api.igdb.com/v4/games',
      `fields * ; search "${searchQuery}"; limit 14; `,

      {
        headers: {
          Accept: 'application/json',
          'Client-ID': process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
        },
      }
    );
    const searchResults = response.data;
    //console.log(searchResults); // Ausgabe von Suchergebnissen auf der Console
    res.json(searchResults);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch from IGDB', details: error.message });
  }
};

export const fetchGamesById = async (req, res) => {
  try {
    // console.log(req.query.id);
    const searchQuery = req.query.id || 'Call of Duty';

    //console.log('SearchQuery:', searchQuery);

    const response = await axios.post(
      'https://api.igdb.com/v4/games',
      `fields * ; where id =  ${searchQuery}; `,

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

    //console.log(searchResults);

    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Search from IGDB' });
  }
};

export const fetchCoverById = async (req, res) => {
  try {
    //console.log(req.query.id);

    const searchQuery = req.query.id;

    //console.log('SearchQuery:', searchQuery);

    const response = await axios.post(
      'https://api.igdb.com/v4/covers',
      `fields * ; where game =  ${searchQuery}; `,
      //`fields *; where game in (45,65,66)`,

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

    //console.log('SearchResults', searchResults);

    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Search from IGDB' });
  }
};

/* const response = await axios.post(
  'https://api.igdb.com/v4/covers',
  `fields * ; where game = 115032; `, // Füge den Suchparameter hier hinzu */
