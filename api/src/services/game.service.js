// /*
//   This file is included as a sample reference for the game. This is implemented as if there was no backend API, so it would not be a valid implementation as the NodeJS backend would have no concept of window or localStorage, but could easily be readapted to live on the server for requests.
// */

// import moment from 'moment';
// import db from '../database.js';
// //const storage = window.localStorage;

// const GAME_DATA = {
//   name: `Player #${Math.floor(Math.random() * 1000)}`, // user_id
//   wins: 0,
//   losses: 0,
//   previousGame: { won: null, color: null },
//   currentGameColors: []
// };

import User from './user.model.js';

const RGB_COLORS = 256;
const MAX_COLORS = 6;

const randomNumber255 = () => {
  return Math.floor(Math.random() * RGB_COLORS);
};

export const initGameData = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Calculate previous total wins and losses
    const previousWins = user.games.reduce((totalWins, game) => totalWins + game.wins, 0);
    const previousLosses = user.games.reduce((totalLosses, game) => totalLosses + game.losses, 0);

    let lastGame = user.games.length > 0 ? user.games[user.games.length - 1] : null;

    if (lastGame) {
      lastGame = resetGame(lastGame);
    } else {
      lastGame = Object.assign(
        {},
        {
          name: user.name,
          wins: previousWins,
          losses: previousLosses,
          previousGame: { won: null, color: null },
          currentGameColors: []
        }
      );
      lastGame = resetGame(lastGame);
      user.games.push(lastGame);
    }
    await user.save();
    return user.games[user.games.length - 1];
  } catch (error) {
    console.log(error.message);
    throw new Error('Error initializing game data');
  }
};

export const saveGameData = async (userId, gameId, index) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const gameIndex = user.games.findIndex((game) => game._id.toString() === gameId);

    if (gameIndex === -1) {
      throw new Error('Game not found');
    }

    const gameData = user.games[gameIndex];
    // Update user's wins and losses based on the result of the current game
    const result = await chooseColorByPosition(gameData, index);
    if (result) {
      gameData.wins += 1;
    } else {
      gameData.losses += 1;
    }
    gameData.previousGame.won = result;
    gameData.previousGame.color = gameData.currentGameColors[index];

    // Save the updated user data
    user.markModified('user.games');
    await user.save();
    // return true;
    return gameData;
  } catch (error) {
    console.log(error.message);
    throw new Error('Error saving game data');
  }
};

export const getGameData = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user.games;
  } catch (error) {
    throw new Error('Error getting game data');
  }
};

export const clearGameData = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }
    user.games = [];
    await user.save();
    return true;
  } catch (error) {
    console.log(error.message);
    throw new Error('Error clearing game data');
  }
};

// choose the color by index and update the game state
const chooseColorByPosition = async (gameData, index) => {
  const result = gameData.currentGameColors[index].winningIndex === true;

  return result;
};

// reset the game
const resetGame = (gameData) => {
  // update new winning index
  const winningIndex = Math.floor(Math.random() * MAX_COLORS);
  // reset all currentGameColors
  gameData.currentGameColors = [];
  for (let i = 0; i < MAX_COLORS; i++) {
    gameData.currentGameColors.push({
      red: randomNumber255(),
      green: randomNumber255(),
      blue: randomNumber255(),
      winningIndex: winningIndex === i
    });
  }

  // save the updated data
  // this.saveGameData();
  return gameData;
};
