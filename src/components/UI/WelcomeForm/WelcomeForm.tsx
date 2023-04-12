import React, {useEffect, useState} from 'react';
import {Button, Grid, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useNavigate} from "react-router-dom";
import {login} from "../../../features/users/usersSlice";
import {fetchCategories, fetchCluesByCategories} from "../../../features/games/gamesThunks";
import {selectCategories} from "../../../features/games/gamesSlice";

const WelcomeForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector(selectCategories);

  const [name, setName] = useState({
    name: '',
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if(categories.length) {
      const categoryIds = categories.map((category) => category.id);
      dispatch(fetchCluesByCategories(categoryIds));
    }
  }, [dispatch, categories]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(login(name.name));
    navigate('/');
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setName((prevState) => {
      return {...prevState, [name]: value};
    });
  };

  return (
    <div>
      <Typography textAlign="center" variant="h4">Welcome! Please enter your name to play the game</Typography>
      <form
        autoComplete="off"
        onSubmit={submitFormHandler}
      >
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2} mt={5}>
          <Grid item width="70%" xs>
            <TextField
              id="name" label="Enter your name"
              value={name.name}
              onChange={inputChangeHandler}
              name="name"
              required
              sx={{width: '100%'}}
              variant="outlined"
            />
          </Grid>
          <Grid item xs width="70%">
            <Button
              color="success"
              variant="contained"
              type="submit"
              fullWidth
            >
              <span>Start the game!</span>
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default WelcomeForm;