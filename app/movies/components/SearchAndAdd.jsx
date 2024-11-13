"use client";
import React, { useState } from "react";

const SearchAndAdd = ({ onAddMovie }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/searchMovies?query=${query}`);
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      setResults(data.movies || []);
    } catch (error) {
      console.error(`[ERROR] ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center w-full gap-4">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded-lg"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-500"
      >
        Search
      </button>
      <div className="w-full">
        {results.map((movie) => (
          <div key={movie.id} className="flex items-center justify-between p-2">
            <span>{movie.title}</span>
            <button
              onClick={() => onAddMovie(movie)}
              className="text-blue-500 hover:underline"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchAndAdd;
