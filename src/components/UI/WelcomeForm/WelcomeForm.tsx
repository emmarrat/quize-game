import React, {useState} from 'react';
import {Button, Grid, TextField, Typography} from "@mui/material";
import {useAppDispatch} from "../../../app/hooks";
import {login} from "../../../features/games/gamesSlice";
import {useNavigate} from "react-router-dom";

const WelcomeForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState({
    name: '',
  });

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