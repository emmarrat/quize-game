import React, {useEffect, useState} from 'react';
import {Grid, Typography} from "@mui/material";
import {Clue} from "../../../types";
import QuestionCard from "./QuestionCard";
import {useAppDispatch} from "../../../app/hooks";
import {markAnswered} from "../gamesSlice";

interface Props {
  clue: Clue;
}

const QuestionPreviewCard: React.FC<Props> = ({clue}) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | string>('');
  const [seconds, setSeconds] = React.useState(60);
  const [timerActive, setTimerActive] = React.useState(false);

  useEffect(() => {
      let intervalId: NodeJS.Timeout;

      if (seconds > 0 && timerActive) {
        intervalId = setTimeout(() => {
          setSeconds(seconds - 1);
        }, 1000);
      } else if (seconds === 0 && timerActive) {
        dispatch(markAnswered(clue.id));
        setIsCorrect(false);
        setTimerActive(false);
      }

      return () => {
        clearTimeout(intervalId);
      };
    },
    [clue.id, dispatch, seconds, timerActive]);

  const handleClose = () => {
    setOpen(false);
    setTimerActive(false);
  };

  const handleClickOpen = () => {
    if (!clue.isAnswered) {
      setOpen(true);
      setTimerActive(true);
    }
  };

  const setTrueAnswer = () => {
    setIsCorrect(true);
    setTimerActive(false);
  };

  const setFalseAnswer = () => {
    setIsCorrect(false);
    setTimerActive(false);
  };


  return (
    <>
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        key={clue.id}
        border="0.5px solid black"
        sx={{
          cursor: 'pointer',
          width: '120px',
          maxWidth: '120px',
          height: '120px',
          backgroundColor: clue.isAnswered ? '#e8ebe8' : '#06b115'
        }}
        onClick={handleClickOpen}
      >
        <Typography
          variant="subtitle1"
          align="center"
          color="#fff"
          fontWeight={600}
        >
          {clue.isAnswered ? '' : clue.value}
        </Typography>
      </Grid>
      <QuestionCard
        open={open}
        handleClose={handleClose}
        clue={clue}
        isCorrect={isCorrect}
        trueAnswer={setTrueAnswer}
        falseAnswer={setFalseAnswer}
        seconds={seconds}
      />
    </>
  );
};

export default QuestionPreviewCard;