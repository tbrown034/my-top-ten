"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch movies with pagination
  const fetchMovies = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/getMovies?page=${page}`);
      const data = await res.json();

      if (res.ok) {
        setMovies((prevMovies) => [...prevMovies, ...data.movies]);
        setTotalPages(data.totalPages);
        setLoading(false);
      } else {
        throw new Error(data.error || "Failed to fetch movies");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Initial fetch and pagination handling
  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  // Handle "Load More" click
  const handleLoadMore = () => {
    if (page < totalPages && movies.length < 50) {
      setPage(page + 1);
    }
  };

  // Handle adding a movie to the selected list
  const handleAddMovie = (movie) => {
    if (!selectedMovies.some((m) => m.id === movie.id)) {
      setSelectedMovies([...selectedMovies, movie]);
    }
  };

  if (loading && movies.length === 0) return <p>Loading movies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold">Top Movies of 2024</h1>
      <h3 className="text-gray-300">Select your top 10 movies of the year.</h3>

      {/* Display movies */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie, index) => (
          <div
            key={`${movie.id}-${index}`}
            className="p-4 bg-teal-800 rounded-lg shadow-md"
          >
            <Image
              src={movie.posterPath}
              alt={movie.title}
              width={500}
              height={750}
              className="object-cover w-full h-64 mb-2 rounded-md"
              priority={false}
              loading="lazy"
            />
            <h4 className="text-lg font-semibold">{movie.title}</h4>
            <p className="text-sm text-gray-300">{movie.releaseDate}</p>
            <button
              onClick={() => handleAddMovie(movie)}
              className="px-4 py-2 mt-2 bg-teal-600 rounded-lg hover:bg-teal-500"
            >
              Add
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {page < totalPages && movies.length < 50 && (
        <button
          onClick={handleLoadMore}
          className="px-4 py-2 mt-6 bg-teal-600 rounded-lg hover:bg-teal-500"
        >
          Load More
        </button>
      )}

      {/* Selected Movies */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Your Selected Movies</h2>
        {selectedMovies.length === 0 ? (
          <p>No movies selected yet.</p>
        ) : (
          <ul>
            {selectedMovies.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Submit Button */}
      <Link href="/movies/submit" className="p-2 mt-4 border-2 rounded-xl">
        Submit
      </Link>
    </div>
  );
};

export default MoviesPage;
