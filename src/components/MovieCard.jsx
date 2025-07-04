import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { Link } from 'react-router';

const MovieCard = ({ movies }) => {
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {movies.map((movie) => {
        const isMovie = movie.media_type === 'movie' || movie.title;
        const linkTo = `/${isMovie ? 'movie' : 'tv'}/${movie.id}`;

        return (
          <div
            key={movie.id}
            className="relative w-40 sm:w-44 md:w-52 flex-shrink-0 rounded-xl overflow-hidden group"
          >
          
            <Link to={linkTo}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title || movie.name}
                className="w-full h-60 object-cover rounded-xl group-hover:opacity-90 transition"
              />
            </Link>

       
            {movie.vote_average > 0 && (
              <div className="absolute bottom-14 left-2 bg-black text-green-300 text-sm text-center font-bold w-10 h-10 flex items-center justify-center rounded-full border-2 border-green-400">
                {Math.round(movie.vote_average * 10)}%
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
              <Link to={linkTo}>
                <h3 className="text-black font-bold text-sm leading-tight line-clamp-2 hover:underline">
                  {movie.title || movie.name}
                </h3>
              </Link>
              <p className="text-gray-600 text-xs">
                {(movie.release_date || movie.first_air_date)
                  ? new Date(movie.release_date || movie.first_air_date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric',
                    })
                  : 'Unknown'}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MovieCard;
