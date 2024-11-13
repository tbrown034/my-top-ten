"use client";
import React, { useState } from "react";
import TopMovies from "./components/TopMovies";
// import UsersTopTen from "./components/UsersTopTen";
// import SearchAndAdd from "./components/SearchAndAdd";

const MoviesPage = () => {
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [finalized, setFinalized] = useState(false);

  // Add movie to the top 10 list
  const handleAddMovie = (movie) => {
    if (
      !selectedMovies.some((m) => m.id === movie.id) &&
      selectedMovies.length < 10
    ) {
      setSelectedMovies([...selectedMovies, movie]);
    }
  };

  // Remove movie from the top 10 list
  const handleRemoveMovie = (id) => {
    setSelectedMovies(selectedMovies.filter((movie) => movie.id !== id));
  };

  // Reorder movie list (move up or down)
  const handleReorder = (index, direction) => {
    const newList = [...selectedMovies];
    const [removed] = newList.splice(index, 1);
    newList.splice(index + direction, 0, removed);
    setSelectedMovies(newList);
  };

  // Finalize the list
  const handleSubmit = () => {
    setFinalized(true);
  };

  // Go back to editing the list
  const handleEdit = () => {
    setFinalized(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {!finalized ? (
        <>
          <h1 className="text-3xl font-bold">Top Movies of 2024</h1>
          <p className="text-gray-400">
            Select up to 10 of your favorite movies.
          </p>
          {/* <SearchAndAdd onAddMovie={handleAddMovie} /> */}
          <TopMovies onAddMovie={handleAddMovie} />
          {/* <UsersTopTen
            selectedMovies={selectedMovies}
            onRemoveMovie={handleRemoveMovie}
            onReorder={handleReorder}
            onSubmit={handleSubmit}
          /> */}
        </>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold">Your Top 10 Movies</h1>
          <ul className="text-lg list-disc list-inside">
            {selectedMovies.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
          <button
            onClick={handleEdit}
            className="px-4 py-2 mt-4 text-white bg-teal-600 rounded-lg hover:bg-teal-500"
          >
            Edit List
          </button>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
