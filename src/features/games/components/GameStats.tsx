import React from 'react';
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useAppSelector} from "../../../app/hooks";
import {selectPreviousUsers, selectUser} from "../gamesSlice";

const styles = {
  bold: {
    fontWeight: 700
  }
}

const GameStats = () => {
  const prevUsers = useAppSelector(selectPreviousUsers);
  const user = useAppSelector(selectUser);

  return (
    <>
      {user && <>
          <Typography variant="h5">Current stats of {user.name}:</Typography>
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                      <TableHead>
                          <TableRow>
                              <TableCell style={styles.bold}>Name</TableCell>
                              <TableCell style={styles.bold}>Current game</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          <TableRow
                              key={user.name}
                              sx={{'&:last-child td, &:last-child th': {border: 0}}}
                          >
                              <TableCell component="th" scope="row">
                                {user.name}
                              </TableCell>
                              <TableCell>
                                {user.currentScore}
                              </TableCell>
                          </TableRow>
                      </TableBody>
                  </Table>
              </TableContainer>
            {user.scores.length > 0 && <>
                <Typography variant="h5" mt={5} mb={1}>Previous games of {user.name}:</Typography>
                <TableContainer component={Paper} sx={{minWidth: '500px'}}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                              {user.scores.map((score, index) => (
                                <TableCell key={index} style={styles.bold}>Game {index + 1}</TableCell>
                              ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                              {user.scores.map((score, index) => (
                                <TableCell component="th" scope="row" key={index}>
                                  {score}
                                </TableCell>
                              ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </>}
          </Box>
      </>}
      <Typography variant="h5" mt={5} mb={1}>All Previous stats:</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{width: '100px'}} style={styles.bold}>Name</TableCell>
              <TableCell sx={{paddingLeft: '31px'}} style={styles.bold}>Scores</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prevUsers.map((prevUser) => (
              <TableRow
                key={prevUser.name + Math.random().toString()}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  {prevUser.name}
                </TableCell>
                <TableCell>
                  {prevUser.scores.map(((score, index) => (
                    <Typography key={index} variant="body1" component="span" sx={{padding: '0 15px'}}>
                      | {score} |
                    </Typography>
                  )))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GameStats;