import express from 'express';
import { fetchUpcomingGames } from './controllers/gameController.js';

const router = express.Router();

router.get('/api/upcoming-games', fetchUpcomingGames);

export default router;