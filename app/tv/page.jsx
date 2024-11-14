"use client";
import React, { useState } from "react";
import TopShows from "./components/TopShows";

const TVPage = () => {
  const [selectedShows, setSelectedShows] = useState([]);
  const [finalized, setFinalized] = useState(false);

  // Add show to the top 10 list
  const handleAddShow = (show) => {
    if (
      !selectedShows.some((s) => s.id === show.id) &&
      selectedShows.length < 10
    ) {
      setSelectedShows([...selectedShows, show]);
    }
  };

  // Remove show from the top 10 list
  const handleRemoveShow = (id) => {
    setSelectedShows(selectedShows.filter((show) => show.id !== id));
  };

  // Reorder show list (move up or down)
  const handleReorder = (index, direction) => {
    const newList = [...selectedShows];
    const [removed] = newList.splice(index, 1);
    newList.splice(index + direction, 0, removed);
    setSelectedShows(newList);
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
          <h1 className="text-3xl font-bold">Top TV Seasons of 2024</h1>
          <p className="text-gray-400">
            Select up to 10 of your favorite TV seasons.
          </p>
          <TopShows onAddShow={handleAddShow} />
        </>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold">Your Top 10 TV Shows</h1>
          <ul className="text-lg list-disc list-inside">
            {selectedShows.map((show) => (
              <li key={show.id}>{show.title}</li>
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

export default TVPage;
