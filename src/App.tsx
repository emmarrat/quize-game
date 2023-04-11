import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import {Routes} from "react-router-dom";

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

          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
