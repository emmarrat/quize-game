import React from 'react';
import {Container, CssBaseline, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import WelcomeForm from "./components/UI/WelcomeForm/WelcomeForm";
import Game from "./features/Game";

function App() {

  return (
    <>
      <CssBaseline/>
      <header>
        header
      </header>
      <main>
        <Container maxWidth="xl" sx={{mt: 5}}>
          <Routes>
            <Route path="/login" element={<WelcomeForm/>}/>
            <Route path="/" element={<Game/>}/>
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
