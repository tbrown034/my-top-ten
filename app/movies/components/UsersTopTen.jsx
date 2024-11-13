"use client";
import React from "react";

const UsersTopTen = ({
  selectedMovies,
  onRemoveMovie,
  onReorder,
  onSubmit,
}) => {
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <h2 className="text-2xl font-bold">Your Selected Movies</h2>
      {selectedMovies.length === 0 ? (
        <p>No movies selected yet.</p>
      ) : (
        <ul className="w-full list-disc list-inside">
          {selectedMovies.map((movie, index) => (
            <li
              key={movie.id}
              className="flex items-center justify-between mb-2"
            >
              <span>{movie.title}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => onReorder(index, -1)}
                  disabled={index === 0}
                  className="text-green-500 hover:underline"
                >
                  ↑
                </button>
                <button
                  onClick={() => onReorder(index, 1)}
                  disabled={index === selectedMovies.length - 1}
                  className="text-red-500 hover:underline"
                >
                  ↓
                </button>
                <button
                  onClick={() => onRemoveMovie(movie.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={onSubmit}
        className="px-4 py-2 mt-4 text-white bg-teal-600 rounded-lg hover:bg-teal-500"
        disabled={selectedMovies.length === 0}
      >
        Finalize List
      </button>
    </div>
  );
};

export default UsersTopTen;
