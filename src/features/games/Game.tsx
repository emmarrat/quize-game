import React from "react";
import {useAppSelector} from "../../app/hooks";
import {selectClues,} from "./gamesSlice";
import {Navigate} from "react-router-dom";
import {Grid, Typography} from "@mui/material";
import {selectUser} from "../users/usersSlice";
import QuestionPreviewCard from "./components/QuestionPreviewCard";

const Game = () => {
  const user = useAppSelector(selectUser);
  const clues = useAppSelector(selectClues);

  if (!user) {
    return <Navigate to="/login"/>;
  }

  return (
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
            border="0.5px solid black"
            sx={{width: '100px', maxWidth: '100px', height: '100px'}}
          >
            <Typography
              variant="body1"
              align="center"
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
