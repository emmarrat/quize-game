import React, {useState} from 'react';
import {Button, Menu, MenuItem} from '@mui/material';
import {Link as NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks";
import {User} from "../../../types";
import {logout} from "../../../features/games/gamesSlice";


interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleLogout =  () => {
    dispatch(logout());
    navigate('/login')
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color="inherit"
      >
        Hello, {user.name}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem component={NavLink} to="/stats">My stats</MenuItem>

      </Menu>
    </>
  );
};

export default UserMenu;
