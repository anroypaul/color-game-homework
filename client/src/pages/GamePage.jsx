import { Box, Button, Grid, Typography } from '@mui/material';
import { getGameData, submitColor } from '../utils/api';
import { useSnackbar } from 'notistack';
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import Rectangle from '../components/Rectangle';
import Loader from '../components/Loader';

import { removeAllGames } from '../utils/api';

export async function loader() {
  const gameData = await getGameData();
  return gameData;
}

export const action = async ({ request }) => {
  try {
    if (request.method === 'DELETE') {
      return await removeAllGames();
    }

    const payload = await request.json();

    if (payload.selectedIndex !== undefined && payload.selectedIndex !== null) {
      const result = await submitColor(payload);
      return result;
    }
  } catch (error) {
    console.log(error.message);
    throw new Error('Error during action');
  }
};

const GamePage = () => {
  const { gameData } = useLoaderData();
  const submit = useSubmit();
  const navigation = useNavigation();
  const { enqueueSnackbar } = useSnackbar();
  let actionData = useActionData();

  if (navigation.state === 'loading' || navigation.state === 'submitting') {
    return <Loader />;
  }

  const handleDeleteClick = async (event) => {
    event.preventDefault();
    submit(null, {
      method: 'delete',
    });
    enqueueSnackbar('All games has been deleted!', { variant: 'danger' });
  };

  const handleRectangleClick = async (event, index) => {
    event.preventDefault();
    const payload = { gameId: gameData.game._id, selectedIndex: index };
    enqueueSnackbar('Game submitted successfully!', { variant: 'success' });
    await submit(payload, {
      method: 'post',
      encType: 'application/json',
    });
    await console.log(actionData);
  };

  const renderColorRectangles = () => {
    return gameData?.game.currentGameColors.map((color, index) => (
      <Rectangle
        onRectangleClick={handleRectangleClick}
        key={`${color.red}+${color.green}+${color.blue}`}
        index={index}
        red={Number(color.red)}
        green={Number(color.green)}
        blue={Number(color.blue)}
        type="submit"
      />
    ));
  };

  const renderWinningColor = () => {
    const color = gameData.game.currentGameColors.find(
      (color) => color.winningIndex
    );
    if (color) {
      return (
        <div
          key={`${color.red}+${color.green}+${color.blue}+w`}
          className="box d"
        >
          FIND THIS COLOR rgb({color.red}, {color.green}, {color.blue})
        </div>
      );
    }
  };

  return (
    <Box alignItems="center" justifyContent="center" display="grid">
      <Form method="post" onSubmit={handleRectangleClick}>
        <Typography variant="h4" textAlign={'center'}>
          {gameData.game.name}&apos;S COLOR GRID
        </Typography>
        <Typography variant="h5" textAlign={'center'}>
          WINS: {gameData.game.wins}, LOSSES: {gameData.game.losses}
        </Typography>
        <Box
          alignItems="center"
          justifyContent="center"
          className="game-grid-container"
        >
          <input
            type="hidden"
            name="gameId"
            defaultValue={gameData?.game._id}
          />
          {renderColorRectangles()}
          {renderWinningColor()}
        </Box>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button variant="outlined" onClick={handleDeleteClick}>
            Delete All Games
          </Button>
          <Box textAlign={'right'}>
            <Typography variant="body1">
              {gameData.sf.text}. {gameData.sf.time}
            </Typography>
            <Typography variant="body1">
              {gameData.nyc.text}. {gameData.nyc.time}
            </Typography>
          </Box>
        </Grid>
      </Form>
    </Box>
  );
};

export default GamePage;
