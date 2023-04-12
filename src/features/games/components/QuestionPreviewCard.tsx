import React, {useState} from 'react';
import {Grid, Typography} from "@mui/material";
import {Clue} from "../../../types";
import QuestionCard from "./QuestionCard";

interface Props {
  clue: Clue;
}

const QuestionPreviewCard: React.FC<Props> = ({clue}) => {
  const [open, setOpen] = React.useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | string>('');


  const handleClickOpen = () => {
    if(!clue.isAnswered) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setTrueAnswer = () => {
    setIsCorrect(true);
  };

  const setFalseAnswer = () => {
    setIsCorrect(false);
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
        sx={{cursor: 'pointer', width: '100px', maxWidth: '100px', height: '100px'}}
        onClick={handleClickOpen}
      >
        <Typography
          variant="subtitle1"
          align="center"
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
      />
    </>
  );
};

export default QuestionPreviewCard;