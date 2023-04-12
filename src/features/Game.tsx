import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {
  selectCategories,
  selectClues,
  selectUser,
} from "./games/gamesSlice";
import {Navigate} from "react-router-dom";
import {fetchCategories, fetchCluesByCategories} from "./games/gamesThunks";
import {Grid, Typography} from "@mui/material";

const Game = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const categories = useAppSelector(selectCategories);
  const clues = useAppSelector(selectClues);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const categoryIds = categories.map((category) => category.id);
    dispatch(fetchCluesByCategories(categoryIds));
  }, [dispatch, categories]);

  if (!user) {
    return <Navigate to="/login"/>;
  }

  return (
    <Grid container>
      <Grid item container
            flexDirection="column"
            alignItems="start"
            justifyContent="space-between"
            xs={3}
            sx={{height: '183px'}}
      >
        {categories.map((category) => (
          <Grid
            item container
            justifyContent="space-between"
            alignItems="center"
            key={category.id}
            border="1px solid black"
            height="28px"
          >
            <Grid
              item container
              justifyContent="center"
            >
              <Typography
                variant="body1"
                align="center"
              >
                {category.title}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid
        item container
        spacing={1}
        xs={9}
      >
        {clues.map((clueRow, index) => (
          <Grid
            item container
            key={index}
            lg={10}
          >
            {clueRow.map((clue) => (
              <Grid
                item
                key={clue.id}
                margin="0 10px"
                border="1px solid black"
                sx={{cursor: 'pointer'}}
                xs={2}
              >
                <Typography
                  variant="subtitle1"
                  align="center"
                >
                  {clue.value ? clue.id : 'No value'}
                </Typography>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Game;
