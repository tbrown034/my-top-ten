"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const TopMovies = ({ onAddMovie }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/getMovies?page=${page}`);
      if (!response.ok)
        throw new Error(`Failed to fetch movies: ${response.status}`);
      const data = await response.json();
      setMovies((prevMovies) => [
        ...prevMovies,
        ...data.movies.filter(
          (movie) => !prevMovies.some((m) => m.id === movie.id)
        ),
      ]);
    } catch (error) {
      console.error(`[ERROR] ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {movies.map((movie) => (
        <div key={movie.id} className="p-4 bg-teal-800 rounded-lg shadow-md">
          <Image
            src={movie.posterPath || "/placeholder.png"}
            alt={movie.title || "No title available"}
            width={500}
            height={750}
            className="object-cover w-full h-64 mb-2 rounded-md"
            loading="lazy"
          />
          <h4 className="text-lg font-semibold">{movie.title}</h4>
          <button
            onClick={() => onAddMovie(movie)}
            className="px-4 py-2 mt-2 text-white bg-teal-600 rounded-lg hover:bg-teal-500"
          >
            Add
          </button>
        </div>
      ))}
      <button
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 mt-4 text-white bg-teal-600 rounded-lg hover:bg-teal-500"
        disabled={loading}
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

export default TopMovies;
