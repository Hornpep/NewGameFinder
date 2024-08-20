import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import './models/index.js';
import sequelize from './db/index.js';


import userController from './controllers/userController.js';
import gameController from './controllers/gameController.js';
import wishlistController from './controllers/wishlistController.js';

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000; 

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
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

// // Server starten
// sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// }).catch(err => {
//   console.error('Unable to connect to the database:', err);
// });