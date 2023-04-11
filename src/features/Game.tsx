import React from 'react';
import {useAppSelector} from "../app/hooks";
import {selectUser} from "./games/gamesSlice";
import {Navigate} from "react-router-dom";

const Game = () => {
  const user = useAppSelector(selectUser);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {user&& user}
    </div>
  );
};

export default Game;