import express from 'express';
import { fetchUpcomingGames } from './controllers/gameController.js';

export default router = express.Router();

router.get('/api/upcoming-games', fetchUpcomingGames);