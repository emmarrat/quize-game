import React, {useEffect} from 'react';
import {Container, CssBaseline, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {selectCategories} from "./features/games/gamesSlice";
import {fetchCategories, fetchCluesByCategory} from "./features/games/gamesThunks";
import WelcomeForm from "./components/UI/WelcomeForm/WelcomeForm";
import Game from "./features/Game";

function App() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  useEffect( () => {
    void dispatch(fetchCategories());
    void dispatch( fetchCluesByCategory(150))

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
