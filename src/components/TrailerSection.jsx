import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlay, FaEllipsisV } from "react-icons/fa";


const TrailerModal = ({ trailerKey, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="relative w-full max-w-2xl aspect-video bg-black rounded-xl overflow-hidden">
        <iframe
          loading="lazy"
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          title="YouTube Trailer"
          allowFullScreen
        ></iframe>
        <button
          className="absolute top-2 right-2 bg-white text-black p-2 rounded-full hover:bg-gray-300 transition"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

const API_KEY = "37950764c84c26ca876141ed8bfeb702";

const TrailerSection = () => {
  const [filter, setFilter] = useState("popular");
  const [trailers, setTrailers] = useState([]);
  const [bgImage, setBgImage] = useState("");
  const [selectedTrailerKey, setSelectedTrailerKey] = useState(null);

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${filter}?api_key=${API_KEY}&language=en-US&page=1`
        );
        const movies = res.data.results;

        const trailerData = await Promise.all(
          movies.slice(0, 10).map(async (movie) => {
            const videoRes = await axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
            );
            const trailer = videoRes.data.results.find(
              (vid) => vid.type === "Trailer" && vid.site === "YouTube"
            );
            return {
              id: movie.id,
              title: movie.title,
              backdrop: movie.backdrop_path,
              poster: movie.poster_path,
              trailerKey: trailer?.key || null,
            };
          })
        );

        const validTrailers = trailerData.filter((t) => t.trailerKey);
        setTrailers(validTrailers);

        if (validTrailers[0]?.backdrop) {
          setBgImage(
            `https://image.tmdb.org/t/p/original${validTrailers[0].backdrop}`
          );
        }
      } catch (err) {
        console.error("Failed to fetch trailers", err);
      }
    };

    fetchTrailers();
  }, [filter]);

  return (
    <div
      className="relative text-white py-10 px-4 sm:px-6 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to right, #0f2027c0, #203a43c0, #2c5364c0), url(${bgImage})`,
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Latest Trailers</h2>
        <div className="flex flex-wrap bg-white p-1 rounded-full w-fit border border-gray-300">
          {["popular", "now_playing", "upcoming", "top_rated"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-1 rounded-full transition-all ${
                filter === item
                  ? "bg-blue-900 text-green-300"
                  : "text-gray-700"
              }`}
            >
              {item.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Trailers List */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {trailers.map((trailer) => (
          <div
            key={trailer.id}
            className="relative w-60 sm:w-64 flex-shrink-0 rounded-xl overflow-hidden"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${trailer.backdrop || trailer.poster}`}
              alt={trailer.title}
              className="w-full h-40 object-cover rounded-xl"
            />
            <button
              onClick={() => setSelectedTrailerKey(trailer.trailerKey)}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-10 h-10 bg-white bg-opacity-70 text-black rounded-full flex items-center justify-center hover:scale-105 transition">
                <FaPlay />
              </div>
            </button>
            <div className="absolute top-2 right-2 text-white bg-black/50 p-1 rounded-full">
              <FaEllipsisV />
            </div>
            <div className="mt-2 px-1">
              <h3 className="text-white font-bold text-base line-clamp-1">
                {trailer.title}
              </h3>
              <p className="text-gray-300 text-sm">Watch Trailer</p>
            </div>
          </div>
        ))}
      </div>

      {/* Trailer Modal */}
      {selectedTrailerKey && (
        <TrailerModal
          trailerKey={selectedTrailerKey}
          onClose={() => setSelectedTrailerKey(null)}
        />
      )}
    </div>
  );
};

export default TrailerSection;
