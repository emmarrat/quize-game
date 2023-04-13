import React from "react";
import {useAppSelector} from "../../app/hooks";
import {selectClues, selectUser,} from "./gamesSlice";
import {Navigate} from "react-router-dom";
import {Grid, Typography} from "@mui/material";
import QuestionPreviewCard from "./components/QuestionPreviewCard";

const Game = () => {
  const user = useAppSelector(selectUser);
  const clues = useAppSelector(selectClues);

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
            border="0.5px solid black"
            sx={{width: '120px', maxWidth: '120px', height: '120px', background: '#1976d2'}}
          >
            <Typography
              variant="body1"
              align="center"
              textTransform="capitalize"
              color="#fff"
              fontWeight={600}
            >
              {clueRow.title}
            </Typography>
          </Grid>

          {clueRow.clues.map((clue) => (
            <QuestionPreviewCard clue={clue} key={clue.id}/>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default Game;
