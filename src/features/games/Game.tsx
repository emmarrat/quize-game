import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {endGame, selectClues, selectGameStatus, selectUser, startGame,} from "./gamesSlice";
import {Navigate} from "react-router-dom";
import {Button, Grid, Typography} from "@mui/material";
import QuestionPreviewCard from "./components/QuestionPreviewCard";

const Game = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const clues = useAppSelector(selectClues);
  const gameStatus = useAppSelector(selectGameStatus);

  const finishTheGame = async() => {
   await dispatch(endGame());
  };

  const startTheGame = async() => {
    await dispatch(startGame());
  };

  if (!user) {
    return <Navigate to="/login"/>;
  }

  return (
    <Grid container>
      <Grid item>
        <Typography fontWeight={700}>
          Your current score: <span style={{color: user.currentScore < 0 ? 'red': 'green'}}>{user.currentScore}</span>
        </Typography>
      </Grid>
      <Grid item ml={5}>
        <Typography fontWeight={700}>
        Game status: <span style={{color: !gameStatus ? 'red': 'green'}}>{gameStatus ? 'Game started' : 'Game is not started'}</span>
        </Typography>
      </Grid>
      {clues.map((clueRow, index) => (
        <Grid
          item container
          key={index}
          lg={12}
          justifyContent="center"
        >
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            border="0.5px solid white"
            sx={{width: '100px', maxWidth: '100px', height: '100px', background: '#1976d2'}}
          >
            <Typography
              variant="body1"
              align="center"
              textTransform="capitalize"
              color="#fff"
              fontWeight={500}
            >
              {clueRow.title}
            </Typography>
          </Grid>

          {clueRow.clues.map((clue) => (
            <QuestionPreviewCard clue={clue} key={clue.id}/>
          ))}
        </Grid>
      ))}
      <Grid item container justifyContent="center" mt={5}>
        <Button
          variant="contained"
          onClick={gameStatus ? finishTheGame : startTheGame}
          style={{background: !gameStatus ? 'green': 'red'}}
        >
          {!gameStatus ? 'Start game' : 'End game'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Game;
