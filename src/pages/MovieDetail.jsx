
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState(null);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const [movieRes, videoRes, castRes, recRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: { api_key: '37950764c84c26ca876141ed8bfeb702' },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
            params: { api_key: '37950764c84c26ca876141ed8bfeb702' },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
            params: { api_key: '37950764c84c26ca876141ed8bfeb702' },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations`, {
            params: { api_key: '37950764c84c26ca876141ed8bfeb702' },
          }),
        ]);

        setMovie(movieRes.data);
        setVideo(videoRes.data.results.find(v => v.type === 'Trailer'));
        setCast(castRes.data.cast.slice(0, 10));
        setRecommendations(recRes.data.results.slice(0, 10));
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen overflow-x-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full sm:h-[500px] h-[350px] md:w-1/3 rounded-xl shadow-lg object-cover"
        />

        <div className="flex-1 overflow-hidden">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            {movie.title} <span className="text-gray-500 font-normal">({new Date(movie.release_date).getFullYear()})</span>
          </h1>
          <p className="text-gray-600 text-sm mt-2 italic break-words">{movie.tagline}</p>

          <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-700">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="bg-gray-300 text-gray-700 px-2 py-1 rounded-full">
                {genre.name}
              </span>
            ))}
          </div>

          <p className="mt-6 text-gray-800 leading-relaxed break-words">{movie.overview}</p>

          <div className="mt-6 text-gray-700 space-y-1">
            <p><strong>Status:</strong> {movie.status}</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Runtime:</strong> {movie.runtime} min</p>
            <p><strong>Rating:</strong> {movie.vote_average.toFixed(1)} / 10</p>
          </div>

          {video && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-2">Trailer</h2>
              <div className="aspect-w-16 aspect-h-9 w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${video.key}`}
                  frameBorder="0"
                  allowFullScreen
                  title="Trailer"
                  className="w-full h-64 md:h-96 rounded-lg"
                ></iframe>
              </div>
            </div>
          )}

          {cast.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Top Cast</h2>
              <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                {cast.map(actor => (
                  <div key={actor.id} className="w-28 flex-shrink-0 text-center">
                    <img
                      src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'https://via.placeholder.com/185x278?text=No+Image'}
                      alt={actor.name}
                      className="w-full h-36 object-cover rounded-md"
                    />
                    <p className="text-sm font-semibold mt-1 truncate">{actor.name}</p>
                    <p className="text-xs text-gray-500 truncate">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {recommendations.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold mb-4">Recommended Movies</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {recommendations.map(rec => (
                  <div key={rec.id} className="bg-white rounded-lg overflow-hidden shadow">
                    <img
                      src={`https://image.tmdb.org/t/p/w300${rec.poster_path}`}
                      alt={rec.title}
                      className="w-full h-44 object-cover"
                    />
                    <div className="p-2">
                      <h3 className="text-sm font-semibold truncate">{rec.title}</h3>
                      <p className="text-xs text-gray-500">Rating: {rec.vote_average.toFixed(1)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
