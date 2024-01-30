import { Box, Typography } from '@mui/material';
import { getGameData } from '../utils/api';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Rectangle from '../components/Rectangle';
import Loader from '../components/Loader';

export async function loader() {
  const gameData = await getGameData();
  return gameData;
}

const GamePage = () => {
  const { gameData } = useLoaderData();
  const navigation = useNavigation();

  if (navigation.state === 'loading') {
    return <Loader />;
  }

  function handleRectangleClick(index) {
    console.log(index);
  }

  return (
    <Box alignItems="center" justifyContent="center" display="grid">
      <Typography variant="h4" textAlign={'center'}>
        {gameData.game.name}&apos;S COLOR GRID
      </Typography>
      <Typography variant="h5" textAlign={'center'}>
        WINS: {gameData.game.wins}, LOSSES: {gameData.game.losses}
      </Typography>
      <Box
        className="game-grid-container"
        alignItems="center"
        justifyContent="center"
      >
        {gameData.game.currentGameColors.map((color, index) => {
          if (color.winningIndex) {
            return (
              <>
                <Rectangle
                  onRectangleClick={handleRectangleClick}
                  key={`${color.red}+${color.green}+${color.blue}`}
                  index={index}
                  red={color.red}
                  green={color.green}
                  blue={color.blue}
                />
                <div
                  key={`${color.red}+${color.green}+${color.blue}+w`}
                  className="box d"
                >
                  FIND THIS COLOR rgb({color.red}, {color.green}, {color.blue})
                </div>
              </>
            );
          }
          return (
            <Rectangle
              onRectangleClick={handleRectangleClick}
              key={`${color.red}+${color.green}+${color.blue}`}
              index={index}
              red={color.red}
              green={color.green}
              blue={color.blue}
            />
          );
        })}
      </Box>
      <Box textAlign={'right'}>
        <Typography variant="body1">
          {gameData.sf.text}. {gameData.sf.time}
        </Typography>
        <Typography variant="body1">
          {gameData.nyc.text}. {gameData.nyc.time}
        </Typography>
      </Box>
    </Box>
  );
};

export default GamePage;
