import Game from '../models/Game.js';
import axios from 'axios';

// Diese CRUD Operations später mit den API calls erweitern

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
    // API-Aufruf zur IGDB, um kommende Spiele zu erhalten
    const response = await axios.post(
      'https://api.igdb.com/v4/games',
      `fields id, name, cover.url, first_release_date, genres.name, platforms.name, involved_companies.company.name, involved_companies.publisher, summary;
      where date > 1724345716; 
      sort date asc;
      limit 10;`,
      {
        headers: {
          'Client-ID': process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
        },
      }
    );

    const upcomingGames = response.data;

    // Schleife über die Ergebnisse der API und Speicherung in der Datenbank
    for (const gameData of upcomingGames) {
      // Überprüfe, ob das Spiel bereits in der Datenbank existiert
      const existingGame = await Game.findOne({
        where: { igdb_id: gameData.id },
      });

      if (!existingGame) {
        // Bestimmen von Developer und Publisher
        let developer = '';
        let publisher = '';

        if (gameData.involved_companies) {
          gameData.involved_companies.forEach((company) => {
            if (company.publisher) {
              publisher = company.company.name;
            } else {
              developer = company.company.name;
            }
          });
        }

        // Spiel existiert noch nicht, füge es in die Datenbank ein
        await Game.create({
          igdb_id: gameData.id,
          name: gameData.name,
          cover_url: gameData.cover?.url || 'default_cover.jpg',
          release_date: new Date(gameData.first_release_date * 1000), // Umwandlung von Unix-Timestamp in JS-Datum
          genres:
            gameData.genres?.map((genre) => genre.name).join(', ') || 'Unknown',
          platforms:
            gameData.platforms?.map((platform) => platform.name).join(', ') ||
            'Unknown',
          developer: developer || 'Unknown',
          publisher: publisher || 'Unknown',
          about: gameData.summary || 'No description available',
        });
      }
    }

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
