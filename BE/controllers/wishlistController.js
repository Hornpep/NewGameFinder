import Wishlist from '../models/Wishlist.js';
import Game from '../models/Game.js';

// Create a new Wishlist (usually linked to a user)
export const createWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.create({
      //id: req.body.id, // nötig
      users_id: req.body.users_id, // Assuming the user ID is provided in the request body // nötig
      //gameId: req.body.gameId, // Assuming the game ID is provided in the request body  // nötig
      // Optional: zusätzliche Felder
      igdb_id: req.body.igdb_id, //nötig
      name: req.body.name, //nötig
      cover_url: req.body.cover_url, //nötig
      genre: req.body.genre,
      release_date: req.body.release_date,
      platform: req.body.platform,
      involved_companies: req.body.involved_companies,
      similar_games: req.body.similar_games,
      //about: req.body.about,
    });
    console.log(wishlist);
    res.status(201).json(wishlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Wishlists for a specific user
export const getWishlistsByUserId = async (req, res) => {
  try {
    const wishlists = await Wishlist.findAll({
      where: { userId: req.params.userId },
      include: [Game],
    });
    res.status(200).json(wishlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Wishlist entry by ID
export const deleteWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findByPk(req.params.id);
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }
    await wishlist.destroy();
    res.status(204).end();
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
