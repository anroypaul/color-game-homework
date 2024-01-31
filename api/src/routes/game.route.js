import express from 'express';
import moment from 'moment-timezone';

import { verifyToken } from '../middlewares.js';

import * as gameService from '../services/game.service.js';
import User from '../services/user.model.js';
const router = express.Router();

router.get('/', [verifyToken], async (req, res) => {
  try {
    const sf = { text: 'San Francisco Time', time: moment().tz('America/Los_Angeles').format('LT. LL') };
    const nyc = { text: 'New York Time', time: moment().tz('America/New_York').format('LT. LL') };

    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }
    const game = await gameService.initGameData(userId);

    const gameData = { sf, nyc, game };

    res.send({ gameData });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to start a new game for a user
router.post('/new-game', [verifyToken], async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const gameId = await gameService.initGameData(userId);

    console.log(gameId);
    res.status(201).json({ gameId });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to end the current game for a user
router.post('/end-game', [verifyToken], async (req, res) => {
  try {
    const userId = req.userId;
    const { gameId, selectedIndex } = req.body;

    console.log(userId, gameId, selectedIndex);

    const gameData = await gameService.saveGameData(userId, gameId, selectedIndex);

    res.status(200).json({ message: 'Game ended successfully', gameData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/delete-all', [verifyToken], async (req, res) => {
  try {
    const result = await gameService.clearGameData(req.userId);
    res.status(204).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
