import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {useAppDispatch} from "../../../app/hooks";
import {startGame} from "../../../features/games/gamesSlice";

interface Props {
  open: boolean;
  handleClose: ()=> void;
  score: number;
}

export const GameOverModal:React.FC<Props> = ({open, handleClose, score}) => {
  const dispatch = useAppDispatch();

  const startTheNewGame = async() => {
    await dispatch(startGame());
    handleClose();
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              Game over! <br/>
            Your final score is: {score}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={startTheNewGame} autoFocus>
            Start new game
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default GameOverModal;