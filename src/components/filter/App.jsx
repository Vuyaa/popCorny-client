import React, { useState } from "react";
import Buttons from "./Buttons";


const App = () => {
  const [Movie, setMovie] = useState(movies);

  const allMovies = [...new Set(movies.map((Val) => Val.genre))];

  const filterMovie = (curcat) => {
    const newMovie = Movies.filter((newVal) => {
      return newVal.genre === curcat;
    });
    setMovie(newMovie);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <h1 className="col-12 text-center my-3 fw-bold">
            Food Filtering App
          </h1>
          <Buttons
            filterMovie={filterMovie}
            setMovie={setMovie}
            allMovies={allMovies}
          />
        </div>
      </div>
    </>
  );
};

export default App;
