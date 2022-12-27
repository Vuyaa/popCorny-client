import React from "react";


const Buttons = ({filterMovie, setMovie, allMovies }) => {
  return (
    <>
      <div className="d-flex justify-content-center">
        {allMovies.map((Val, _id) => {
          return (
            <button
              className="btn-dark text-white p-1 px-2 mx-5 btn fw-bold"
              onClick={() => filterMovie(Val)}
              key={_id}
            >
              {Val}
            </button>
          );
        })}
        <button
          className="btn-dark text-white p-1 px-3 mx-5 fw-bold btn"
          onClick={() => setMovie(Movies)}
        >
          All
        </button>

        {/* <button
          className="btn-warning text-white p-1 mx-5"
          onClick={() => filterItem("Breakfast")}
        >
          Breakfast
        </button>
        <button
          className="btn-warning text-white p-1 px-2 mx-5"
          onClick={() => filterItem("Lunch")}
        >
          Lunch
        </button>
        <button
          className="btn-warning text-white p-1 mx-5"
          onClick={() => filterItem("Dinner")}
        >
          Dinner
        </button> */}
      </div>
    </>
  );
};

export default Buttons;
