import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { FaEllipsisV } from 'react-icons/fa';

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/search/multi`, {
          params: {
            api_key: '37950764c84c26ca876141ed8bfeb702',
            query,
          },
        });
        setResults(res.data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white min-h-screen">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
        Search Results for "<span className="text-blue-600">{query}</span>"
      </h2>

      {results.length === 0 ? (
        <p className="text-gray-500 text-center">No results found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 place-items-center">
          {results.map((movie) => (
            <div
              key={movie.id}
              className="relative w-full max-w-[160px] rounded-xl overflow-hidden group"
            >
            
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title || movie.name}
                className="w-full h-60 object-cover rounded-xl group-hover:opacity-90 transition"
              />

              
              {movie.vote_average > 0 && (
                <div className="absolute bottom-20 left-2 bg-black text-green-300 text-sm font-bold w-10 h-10 flex items-center justify-center rounded-full border-2 border-green-400">
                  {Math.round(movie.vote_average * 10)}
                  <sup className="text-[10px]">%</sup>
                </div>
              )}

            
              <div
                className="absolute top-2 right-2 text-white bg-black/50 p-1 rounded-full cursor-pointer hover:bg-black z-10"
                onClick={() => toggleDropdown(movie.id)}
              >
                <FaEllipsisV />
              </div>

             
              {openDropdownId === movie.id && (
                <div className="absolute top-10 right-2 bg-white text-black rounded-md shadow-lg w-40 z-20">
                  <ul className="text-sm">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Add to Watchlist</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Add to Cart</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Share</li>
                  </ul>
                </div>
              )}

              <div className="mt-2 px-1">
                <h3 className="text-black font-bold text-sm leading-tight line-clamp-2">
                  {movie.title || movie.name}
                </h3>
                <p className="text-gray-600 text-xs">
                  {movie.release_date || movie.first_air_date
                    ? new Date(movie.release_date || movie.first_air_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: '2-digit',
                        year: 'numeric',
                      })
                    : 'Unknown'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
