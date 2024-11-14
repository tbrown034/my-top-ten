"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const formatNumber = (number) => {
    return number.toLocaleString();
  };

  const renderStars = (rating) => {
    const stars = Math.round((rating / 10) * 5);
    return (
      <div className="flex">
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={index < stars ? "text-yellow-400" : "text-gray-400"}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  return (
    <div className="grid w-full gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {movies.map((movie) => (
        <Link
          href={`/movies/${movie.id}`}
          key={movie.id}
          className="block p-4 bg-teal-800 rounded-lg shadow-md hover:bg-teal-700"
        >
          <div className="relative w-full mb-2 h-96">
            <Image
              src={movie.posterPath || "/placeholder.png"}
              alt={movie.title || "No title available"}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
              className="rounded-md"
              loading="lazy"
            />
          </div>
          <h4 className="text-lg font-semibold">{movie.title}</h4>
          <p className="text-sm text-gray-300">
            Release Date: {formatDate(movie.releaseDate)}
          </p>
          <div className="flex items-center">
            {renderStars(movie.rating)}
            <span className="ml-2 text-sm text-gray-300">
              {movie.rating.toFixed(1)} / 10
            </span>
          </div>
          <p className="text-sm text-gray-300">
            Reviews: {formatNumber(movie.voteCount)}
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddMovie(movie);
            }}
            className="px-4 py-2 mt-2 text-white bg-teal-600 rounded-lg hover:bg-teal-500"
          >
            Add
          </button>
        </Link>
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
