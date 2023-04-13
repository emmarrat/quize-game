import React, {useState} from 'react';
import {Button, Dialog, DialogContent, Grid, TextField, Typography} from "@mui/material";
import {Clue} from "../../../types";
import {useAppDispatch} from "../../../app/hooks";
import {markAnswered} from "../gamesSlice";

export interface Props {
  open: boolean;
  handleClose: () => void;
  clue: Clue;
  isCorrect: boolean | string;
  trueAnswer: () => void;
  falseAnswer: () => void;
  seconds: number
}

const QuestionCard:React.FC<Props> = ({open, handleClose, clue, isCorrect, trueAnswer, falseAnswer, seconds}) => {
  const dispatch = useAppDispatch();

  const [question, setQuestion] = useState({
    answer: '',
  });


  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(markAnswered(clue.id));
    if(clue.answer.toLowerCase() === question.answer.toLowerCase()) {
     trueAnswer();
    } else {
     falseAnswer();
    }
    setQuestion(prev =>({
      ...prev, answer: '',
    }));
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
        <DialogContent sx={{padding: '10px'}}>
          <Typography variant="body1" textAlign="center" my={3}>{clue.question}</Typography>
          <Typography variant="subtitle1" textAlign="center" my={3}>left: {seconds}</Typography>

          {isCorrect && <Typography variant="h5" textAlign="center" fontWeight={700} textTransform="uppercase" sx={{color: "green"}}>Correct!</Typography>}
          {isCorrect === false && <Typography variant="h5" textAlign="center" fontWeight={700} textTransform="uppercase" sx={{color: "red"}}>Not Correct :(</Typography>}
          <form
              autoComplete="off"
              onSubmit={submitFormHandler}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
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
                  <Typography textAlign="center" fontSize="12px" variant="subtitle1">Hint:{clue.answer}</Typography>
                </Grid>
              </Grid>
            </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuestionCard;