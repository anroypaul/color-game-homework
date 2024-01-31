import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const gameColorSchema = mongoose.Schema({
  red: String,
  green: String,
  blue: String,
  winningIndex: Boolean
});

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: {
    type: String,
    unique: true
  },
  games: [
    {
      name: String,
      wins: Number,
      losses: Number,
      previousGame: { won: Boolean, color: gameColorSchema },
      currentGameColors: [gameColorSchema]
    }
  ]
});

const User = mongoose.model('User', userSchema);

export default User;
