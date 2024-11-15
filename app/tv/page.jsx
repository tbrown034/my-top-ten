"use client";
import React, { useState } from "react";
import TopShows from "./components/TopShows";

const TVPage = () => {
  const [selectedShows, setSelectedShows] = useState([]);
  const [finalized, setFinalized] = useState(false);

  const handleAddShow = (show) => {
    if (
      !selectedShows.some((s) => s.id === show.id) &&
      selectedShows.length < 10
    ) {
      setSelectedShows([...selectedShows, show]);
    }
  };

  const handleRemoveShow = (id) => {
    setSelectedShows(selectedShows.filter((show) => show.id !== id));
  };

  const handleSubmit = () => {
    setFinalized(true);
  };

  const handleEdit = () => {
    setFinalized(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {!finalized ? (
        <>
          <h1 className="text-3xl font-bold text-teal-100">
            Top TV Seasons of 2024
          </h1>
          <p className="text-gray-300">
            Select up to 10 of your favorite TV seasons.
          </p>
          <TopShows onAddShow={handleAddShow} />
          {selectedShows.length > 0 && (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 mt-4 text-lg font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-500"
            >
              Finalize List
            </button>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold text-teal-100">
            Your Top 10 TV Shows
          </h1>
          <ul className="text-lg text-teal-200 list-disc list-inside">
            {selectedShows.map((show) => (
              <li key={show.id}>{show.title}</li>
            ))}
          </ul>
          <button
            onClick={handleEdit}
            className="px-6 py-2 mt-4 text-lg font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-500"
          >
            Edit List
          </button>
        </div>
      )}
    </div>
  );
};

export default TVPage;
