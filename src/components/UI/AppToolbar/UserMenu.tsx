import React, {useState} from 'react';
import {Button, Menu, MenuItem, Typography} from '@mui/material';
import {Link as NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks";
import {User} from "../../../types";
import {logout} from "../../../features/games/gamesSlice";
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
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
      <Typography fontWeight={700} sx={{padding: '6px' ,border: '1px solid white', borderRadius: '8px', display: 'inline-block'}}>
        Your current score: <span
        style={{color: user.currentScore < 0 ? '#ed1f1f' : '#69ee86'}}>{user.currentScore}</span>
      </Typography>
      <Button
        onClick={handleClick}
        color="inherit"
      >
        Hello, {user.name}
        <ArrowCircleDownOutlinedIcon sx={{ml: 1}}/>
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem component={NavLink} to="/stats">All Statistics</MenuItem>

      </Menu>
    </>
  );
};

export default UserMenu;
