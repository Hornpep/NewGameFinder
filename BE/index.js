import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import sequelize from './db/index.js'; // Importiere die Sequelize-Instanz
import User from './models/User.js';
import Game from './models/Game.js';
import Wishlist from './models/Wishlist.js';
import authRouter from './routes/authRouter.js';
import {
  getGameById,
  getAllGames,
  fetchAllGames,
  fetchSearch,
  fetchUpcomingGames,
  fetchGamesById,
  fetchCoverById,
} from './controllers/gameController.js';
import {
  createWishlist,
  getWishlistsByUserId,
  deleteWishlist,
  updateGame,
  deleteGame,
} from './controllers/wishlistController.js';
import { getUser } from './controllers/userController.js';

const app = express();
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use('/auth', authRouter);

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.post('/users', userController.createUser);
app.get('/users/:id', getUser);
// app.put('/users/:id', userController.updateUser);
// app.delete('/users/:id', userController.deleteUser);

app.get('/games', getAllGames);
app.get('/games/:id', getGameById);
app.put('/games/:id', updateGame);
app.delete('/games/:id', deleteGame);

app.get('/all-games', fetchAllGames);

app.get('/search', fetchSearch);
app.get('/searchGameByID', fetchGamesById); // Abruf Games für DetailPage
app.get('/searchCoverByID', fetchCoverById); // Abruf Cover für DetailPage

app.get('/upcoming-games', fetchUpcomingGames);

app.post('/wishlists', createWishlist);
app.get('/users/:userId/wishlists', getWishlistsByUserId);
app.delete('/wishlists/:id', deleteWishlist);

// Fange alle nicht definierten Routen ab
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Synchronisiere die Modelle mit der Datenbank und starte den Server
sequelize
  .sync() // Dies aktualisiert die Datenbankstruktur basierend auf den Modellen
  .then(() => {
    console.log('All models were synchronized successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to synchronize the models:', error);
  });
