import Game from '../models/Game.js';
import axios from 'axios';

// Diese CRUD Operations später mit den API calls erweitern

// Create a new Game
exports.createGame = async (req, res) => {
  try {
    const game = await Game.create(req.body);
    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single Game by ID
exports.getGameById = async (req, res) => {
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
exports.updateGame = async (req, res) => {
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
exports.deleteGame = async (req, res) => {
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
      const response = await axios.post('https://api.igdb.com/v4/games', 
      `fields name,cover.url,first_release_date,genres.name;
      where first_release_date > ${Math.floor(Date.now() / 1000)};
      sort first_release_date asc;
      limit 10;`,
      {
          headers: {
              'Client-ID': process.env.IGDB_CLIENT_ID,
              'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN}`
          }
      });

      res.json(response.data);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch upcoming games from IGDB' });
  }
};