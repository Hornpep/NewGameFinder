import Wishlist from '../models/Wishlist.js';
import Game from '../models/Game.js';

// Create a new Wishlist (usually linked to a user)
export const createWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.create({
      userId: req.body.userId, // Assuming the user ID is provided in the request body
      gameId: req.body.gameId, // Assuming the game ID is provided in the request body
    });
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
