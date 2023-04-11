import React, {useEffect} from 'react';
import {Container, CssBaseline} from "@mui/material";
import {Routes} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {selectCategories} from "./features/games/gamesSlice";
import {fetchCategories} from "./features/games/gamesThunks";

function App() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  useEffect( () => {
    void dispatch(fetchCategories())
  }, [dispatch]);

  console.log(categories);


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
