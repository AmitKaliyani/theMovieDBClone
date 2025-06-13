// components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = ({ onApplyFilters }) => {
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genres, setGenres] = useState([]);

  
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=37950764c84c26ca876141ed8bfeb702`)
      .then((res) => setGenres(res.data.genres));
  }, []);

  const handleApply = () => {
    onApplyFilters({
      sort_by: sortBy,
      with_genres: selectedGenre,
    });
  };

  return (
    <aside className="w-[280px] p-4 md:border-r border-gray-300  mx-auto  mb-5 bg-white">
      <h2 className="text-2xl font-semibold mb-6">Filters</h2>

      {/* Sort Dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="popularity.desc">Most Popular</option>
          <option value="popularity.asc">Least Popular</option>
          <option value="release_date.desc">Newest</option>
          <option value="release_date.asc">Oldest</option>
          <option value="vote_average.desc">Top Rated</option>
          <option value="vote_average.asc">Low Rated</option>
        </select>
      </div>

      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Genre</label>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option value={genre.id} key={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

     
      <button
        onClick={handleApply}
        className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded mt-4"
      >
        Search
      </button>
    </aside>
  );
};

export default Sidebar;
