import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const TrendingSection = () => {
  const [filter, setFilter] = useState('day');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/${filter}?api_key=37950764c84c26ca876141ed8bfeb702`
        );
        setMovies(res.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrending();
  }, [filter]);

  return (
    <div className="p-4 sm:p-6 bg-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <h2 className="text-2xl font-bold">Trending</h2>
        <div className="flex bg-white p-1 rounded-full w-fit border border-gray-300">
          <button
            onClick={() => setFilter('day')}
            className={`px-4 py-1 rounded-full transition-all ${
              filter === 'day' ? 'bg-blue-900 text-green-300' : 'text-gray-700'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setFilter('week')}
            className={`px-4 py-1 rounded-full transition-all ${
              filter === 'week' ? 'bg-blue-900 text-green-300' : 'text-gray-700'
            }`}
          >
            This Week
          </button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        <MovieCard movies={movies} />
      </div>
    </div>
  );
};

export default TrendingSection;
