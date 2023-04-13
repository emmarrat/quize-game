import React, {useEffect, useState} from 'react';
import {Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography} from "@mui/material";
import {Clue} from "../../../types";
import {useAppDispatch} from "../../../app/hooks";
import {decrementScore, incrementScore, markAnswered} from "../gamesSlice";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import CloseIcon from '@mui/icons-material/Close';

export interface Props {
  open: boolean;
  handleClose: () => void;
  clue: Clue;
  isCorrect: boolean | string;
  trueAnswer: () => void;
  falseAnswer: () => void;
  seconds: number;
}

const QuestionCard: React.FC<Props> =
  ({
     open,
     handleClose,
     clue,
     isCorrect,
     trueAnswer,
     falseAnswer,
     seconds
   }) => {
    const dispatch = useAppDispatch();
    const [question, setQuestion] = useState({
      answer: '',
    });
    const [timerForModal, setTimerForModal] = useState(false);
    const [modalSeconds, setModalSeconds] = useState(1);

    useEffect(() => {
      let intervalId: NodeJS.Timeout;
      if (modalSeconds > 0 && timerForModal) {
        intervalId = setTimeout(() => {
          setModalSeconds(modalSeconds - 1);
        }, 500);
      } else if (modalSeconds === 0 && timerForModal) {
        handleClose();
      }
      return () => {
        clearTimeout(intervalId);
      };
    }, [modalSeconds, timerForModal, handleClose]);

    const submitFormHandler = async (e: React.FormEvent) => {
      e.preventDefault();
      await dispatch(markAnswered(clue.id));
      if (clue.answer.replace(/<[^>]+>/g, '').toLowerCase() === question.answer.toLowerCase()) {
        await dispatch(incrementScore(clue.value));
        trueAnswer();
      } else {
        await dispatch(decrementScore(clue.value));
        falseAnswer();
      }
      setQuestion(prev => ({
        ...prev, answer: '',
      }));
      setTimerForModal(true);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setQuestion((prevState) => {
        return {...prevState, [name]: value};
      });
    };

    return (
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
        >
          <DialogTitle>
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon/>
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{padding: '10px', height: '350px'}}>
            <Box sx={{height: '100px', paddingTop: '20px'}}>
              {isCorrect &&
                  <Typography
                      variant="h5"
                      textAlign="center"
                      fontWeight={700}
                      textTransform="uppercase"
                      sx={{color: "green"}}
                  >
                      Correct!
                  </Typography>
              }
              {isCorrect === false &&
                  <Typography
                      variant="h5"
                      textAlign="center"
                      fontWeight={700}
                      textTransform="uppercase"
                      sx={{color: "red"}}
                  >
                      Not Correct :(
                  </Typography>
              }
              {!clue.isAnswered &&
                  <>
                      <Typography variant="body1" textAlign="center" mb={3}>{clue.question}</Typography>
                      <Typography
                          variant="subtitle1"
                          textAlign="center"
                          sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                      >
                          <TimerOutlinedIcon sx={{mr: 1}}/><span>{seconds}</span>
                      </Typography>
                  </>
              }
            </Box>
            <form
              autoComplete="off"
              onSubmit={submitFormHandler}
            >
              <Grid
                container
                direction="column"
                justifyContent="end"
                alignItems="center"
                spacing={2} mt={5}
              >
                <Grid item width="70%" xs>
                  <TextField
                    id="name" label="Enter your answer"
                    value={question.answer}
                    onChange={inputChangeHandler}
                    name="answer"
                    required
                    sx={{width: '100%'}}
                    variant="outlined"
                    disabled={clue.isAnswered}
                  />
                </Grid>
                <Grid item xs width="70%">
                  <Button
                    color="success"
                    variant="contained"
                    type="submit"
                    fullWidth
                    disabled={clue.isAnswered}
                  >
                    <span>Submit answer!</span>
                  </Button>
                </Grid>
                <Grid item xs>
                  <Typography
                    textAlign="center"
                    fontSize="12px"
                    variant="subtitle1"
                  >
                    Hint: {clue.answer.replace(/<[^>]+>/g, '')}
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  };

export default QuestionCard;