import React from 'react';
import {AppBar, Grid, styled, Toolbar, Typography} from '@mui/material';
import {Link as NavLink} from 'react-router-dom';
import {useAppSelector} from "../../../app/hooks";
import UserMenu from "./UserMenu";
import {selectUser} from "../../../features/games/gamesSlice";

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            <Link to="/">
              Game
            </Link>
          </Typography>
          <Grid item container justifyContent="space-between" alignItems="center" lg={11}>
            {user && (<UserMenu user={user}/>)}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;