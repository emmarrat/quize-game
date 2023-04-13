import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {endGame, selectClues, selectGameStatus, selectUser, startGame,} from "./gamesSlice";
import {Navigate} from "react-router-dom";
import {Button, Grid, Typography} from "@mui/material";
import QuestionPreviewCard from "./components/QuestionPreviewCard";
import {ClueCategorySorted} from "../../types";

const Game = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const clues = useAppSelector(selectClues);
  const gameStatus = useAppSelector(selectGameStatus);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const result = areAllCluesAnswered(clues);
    if (result) {
      dispatch(endGame());
      setGameOver(true);
    }
  }, [dispatch, clues]);

  const areAllCluesAnswered = (clueCategories: ClueCategorySorted[]): boolean => {
    for (const category of clueCategories) {
      for (const clue of category.clues) {
        if (!clue.isAnswered) {
          return false;
        }
      }
    }
    return true;
  };

  const finishTheGame = async () => {
    await dispatch(endGame());
  };

  const startTheGame = async () => {
    await dispatch(startGame());
    setGameOver(false)
  };

  if (!user) {
    return <Navigate to="/login"/>;
  }

  return (
    <>
      {gameOver &&
          <Grid container justifyContent="center" alignItems="center" my={3}>
              <Typography fontWeight={700} variant="h4" color="error">
                  Game Over!
              </Typography>
          </Grid>}
      <Grid container>
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
            style={{background: !gameStatus ? 'green' : 'red'}}
          >
            {!gameStatus ? 'Start game' : 'End game'}
          </Button>
        </Grid>
        <Grid item container justifyContent="center" mt={5}>
          <Typography fontWeight={700}>
            Game status: <span
            style={{color: !gameStatus ? 'red' : 'green'}}>{gameStatus ? 'Playing' : 'Not started'}</span>
          </Typography>
        </Grid>
      </Grid></>
  );
};

export default Game;
