import React from 'react';
import {Container, CssBaseline, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import WelcomeForm from "./components/UI/WelcomeForm/WelcomeForm";
import Game from "./features/games/Game";
import GamesStat from "./features/games/GamesStat";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";

function App() {

  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl" sx={{mt: 5}}>
          <Routes>
            <Route path="/login" element={<WelcomeForm/>}/>
            <Route path="/" element={<Game/>}/>
            <Route path="/stats" element={<GamesStat/>}/>
            <Route
              path="*"
              element={
                <Typography variant="h3" fontWeight="bold" textAlign="center" mt={5}>
                  Page not found!
                </Typography>
              }
            />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
