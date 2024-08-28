import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import sequelize from './db/index.js'; // Importiere die Sequelize-Instanz
import User from './models/User.js';
import Game from './models/Game.js';
import Wishlist from './models/Wishlist.js';
import authRouter from './routes/authRouter.js';
import { getGameById, getAllGames, fetchAllGames, fetchUpcomingGames } from './controllers/gameController.js';
import { createWishlist, getWishlistsByUserId, deleteWishlist, updateGame, deleteGame } from './controllers/wishlistController.js';


const app = express();
app.use(express.json());
app.use(cors());
// app.use(cors({  
//   origin: "http://localhost:8080",
//   methods: ["GET", "POST", "PUT", "DELETE"],
// }));
app.use('/auth', authRouter);

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// app.post('/users', userController.createUser);
// app.get('/users/:id', userController.getUserById);
// app.put('/users/:id', userController.updateUser);
// app.delete('/users/:id', userController.deleteUser);

app.get('/games', getAllGames);
app.get('/games/:id', getGameById);
app.put('/games/:id', updateGame);
app.delete('/games/:id', deleteGame);

app.get('/all-games', fetchAllGames);


app.get('/upcoming-games', fetchUpcomingGames);

app.post('/wishlists', createWishlist);
app.get('/users/:userId/wishlists', getWishlistsByUserId);
app.delete('/wishlists/:id', deleteWishlist);

// Synchronisiere die Modelle mit der Datenbank und starte den Server
sequelize.sync({ alter: true })  // Dies aktualisiert die Datenbankstruktur basierend auf den Modellen
  .then(() => {
    console.log('All models were synchronized successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to synchronize the models:', error);
  });