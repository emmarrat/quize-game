import React, {useEffect, useState} from 'react';
import {Button, Grid, TextField, Typography} from "@mui/material";
import {useAppDispatch} from "../../../app/hooks";
import {useNavigate} from "react-router-dom";
import {fetchCluesArray} from "../../../features/games/gamesThunks";
import {login} from "../../../features/games/gamesSlice";

const WelcomeForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState({
    name: '',
  });

  useEffect(() => {
      dispatch(fetchCluesArray());
  }, [dispatch]);

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
      <Typography textAlign="center" variant="h4" lineHeight={1.5} textTransform="uppercase">
        Welcome! <br/>
        Please enter your name to start the game
      </Typography>
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