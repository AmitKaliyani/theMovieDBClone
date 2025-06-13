import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const FreeToWatchSection = () => {
  const [type, setType] = useState('movie'); // 'movie' or 'tv'
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchFreeToWatch = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/discover/${type}?api_key=37950764c84c26ca876141ed8bfeb702&watch_region=IN&with_watch_monetization_types=free`
        );
        setItems(res.data.results);
      } catch (err) {
        console.error('Error fetching free to watch:', err);
      }
    };

    fetchFreeToWatch();
  }, [type]);

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex gap-3 mb-4 items-center">
        <h2 className="text-2xl font-bold">Free To Watch</h2>
        <div className="flex bg-white p-1 rounded-full border border-gray-300">
          <button
            onClick={() => setType('movie')}
            className={`px-4 py-1 rounded-full transition-all ${
              type === 'movie' ? 'bg-blue-900 text-green-300' : 'text-gray-700'
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => setType('tv')}
            className={`px-4 py-1 rounded-full transition-all ${
              type === 'tv' ? 'bg-blue-900 text-green-300' : 'text-gray-700'
            }`}
          >
            TV
          </button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        <MovieCard movies={items} />
      </div>
    </div>
  );
};

export default FreeToWatchSection;
