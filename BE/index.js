import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import './models/index.js';
import sequelize from './db/index.js';
import User from './models/User.js';
import Game from './models/Game.js';
import Wishlist from './models/Wishlist.js';


// import userController from './controllers/userController.js';
// import { createGame, getGameById, updateGame, deleteGame, fetchUpcomingGames } from './controllers/gameController.js';
// import { createWishlist, getWishlistsByUserId, deleteWishlist } from './controllers/wishlistController.js';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080; 

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Synchronisiere die Modelle mit der Datenbank und starte den Server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('All models were synchronized successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to synchronize the models:', error);
  });

  // // Routen für User
// app.post('/users', userController.createUser);
// app.get('/users/:id', userController.getUserById);
// app.put('/users/:id', userController.updateUser);
// app.delete('/users/:id', userController.deleteUser);

// // Routen für Games
// app.post('/games', gameController.createGame);
// app.get('/games/:id', gameController.getGameById);
// app.put('/games/:id', gameController.updateGame);
// app.delete('/games/:id', gameController.deleteGame);

// // Routen für Wishlists
// app.post('/wishlists', wishlistController.createWishlist);
// app.get('/users/:userId/wishlists', wishlistController.getWishlistsByUserId);
// app.delete('/wishlists/:id', wishlistController.deleteWishlist);