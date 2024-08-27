import Game from '../models/Game.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Create a new Game
export const createGame = async (req, res) => {
  try {
    const game = await Game.create(req.body);
    res.status(201).json(game);
    console.log('Hallo');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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

// Update a Game by ID
export const updateGame = async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    await game.update(req.body);
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Game by ID
export const deleteGame = async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    await game.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchUpcomingGames = async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.igdb.com/v4/games/',
      `fields name,category,cover,first_release_date,genres,involved_companies,name,platforms,release_dates,similar_games,summary; limit 10;`,
      {
        method: 'POST',
        headers: {
          'Client-ID': process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
        },
      }
    );
    
 
    // Erfolgsnachricht zurücksenden
    res
      .status(200)
      .json({ message: 'Upcoming games fetched and stored successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch and store upcoming games from IGDB' });
  }
};
