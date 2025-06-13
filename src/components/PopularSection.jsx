import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const PopularSection = () => {
  const [filter, setFilter] = useState("now_playing");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${filter}?api_key=37950764c84c26ca876141ed8bfeb702`);
        setMovies(res.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrending();
  }, [filter]);

  return (
    <div className="p-4 sm:p-6 bg-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center  gap-4 mb-4">
        <h2 className="text-2xl font-bold">What's Popular</h2>
        <div className="flex flex-wrap bg-white p-1 rounded-full w-fit border border-gray-300">
          <button
            onClick={() => setFilter('now_playing')}
            className={`px-4 py-1 rounded-full transition-all ${
              filter === "now_playing" ? "bg-blue-900 text-green-300" : "text-gray-700"
            }`}
          >
            Streaming
          </button>
          <button
            onClick={() => setFilter('top_rated')}
            className={`px-4 py-1 rounded-full transition-all ${
              filter === "top_rated" ? "bg-blue-900 text-green-300" : "text-gray-700"
            }`}
          >
            On Tv
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-1 rounded-full transition-all ${
              filter === "upcoming" ? "bg-blue-900 text-green-300" : "text-gray-700"
            }`}
          >
            For Rent
          </button>
          <button
            onClick={() => setFilter('popular')}
            className={`px-4 py-1 rounded-full transition-all ${
              filter === "popular" ? "bg-blue-900 text-green-300" : "text-gray-700"
            }`}
          >
            In Theaters
          </button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        <MovieCard movies={movies} />
      </div>
    </div>
  );
};

export default PopularSection;
