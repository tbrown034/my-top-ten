"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const TopShows = ({ onAddShow }) => {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchShows = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/getTV?page=${page}`);
      if (!response.ok)
        throw new Error(`Failed to fetch TV shows: ${response.status}`);
      const data = await response.json();

      if (data.shows.length === 0) {
        setHasMore(false);
      } else {
        setShows((prevShows) => [
          ...prevShows,
          ...data.shows.filter(
            (show) => !prevShows.some((s) => s.id === show.id)
          ),
        ]);
      }
    } catch (error) {
      console.error(`[ERROR] ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatNumber = (number) => number.toLocaleString();

  const renderStars = (rating) => {
    const stars = Math.round((rating / 10) * 5);
    return (
      <div
        className="flex"
        aria-label={`Rating: ${rating.toFixed(1)} out of 10`}
      >
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
    fetchShows(page);
  }, [page]);

  return (
    <>
      <div className="grid w-full gap-8 px-4 py-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {shows.map((show) => (
          <Link
            href={`/tv/${show.id}`}
            key={show.id}
            className="block p-6 transition-transform transform bg-teal-800 rounded-lg shadow-lg hover:bg-teal-700 hover:scale-105"
            aria-label={`Details about ${show.title}`}
          >
            <div className="relative w-full mb-4 h-96">
              <Image
                src={show.posterPath || "/placeholder.png"}
                alt={show.title || "No title available"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
                className="rounded-md"
                loading="lazy"
              />
            </div>
            <h4 className="text-xl font-semibold text-white">{show.title}</h4>
            <p className="text-sm text-gray-300">
              First Air Date: {formatDate(show.firstAirDate)}
            </p>
            <div className="flex items-center mt-2">
              {renderStars(show.rating)}
              <span className="ml-2 text-sm text-gray-300">
                {show.rating.toFixed(1)} / 10
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-300">
              Reviews: {formatNumber(show.voteCount)}
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                onAddShow(show);
              }}
              className="w-full px-4 py-2 mt-4 text-white transition-colors bg-teal-600 rounded-lg hover:bg-teal-500"
            >
              Add to Favorites
            </button>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center py-8">
          <button
            onClick={() => setPage(page + 1)}
            className="px-8 py-3 text-lg font-semibold text-white transition-colors bg-teal-600 rounded-lg hover:bg-teal-500"
            disabled={loading}
            aria-label="Load more TV shows"
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Loading...
              </span>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}

      {!hasMore && (
        <div className="flex justify-center py-8">
          <p className="text-lg text-gray-400">
            You've reached the end of the list.
          </p>
        </div>
      )}
    </>
  );
};

export default TopShows;
