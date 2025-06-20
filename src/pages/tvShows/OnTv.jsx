import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import MovieCard from "../../components/MovieCard";

const OnTv = () => {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    with_genres: "",
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (reset = false) => {
    setLoading(true);
    const { with_genres } = filters;
    let url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=37950764c84c26ca876141ed8bfeb702&page=${reset ? 1 : page}`;
    if (with_genres) url += `&with_genres=${with_genres}`;

    const res = await axios.get(url);
    if (reset) {
      setMovies(res.data.results);
      setPage(1);
    } else {
      setMovies((prev) => [...prev, ...res.data.results]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(true);
  }, [filters]);

  useEffect(() => {
    if (page !== 1) fetchMovies();
  }, [page]);

  return (
    <div className="bg-white text-black min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">TV Shows On Air</h1>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="w-full lg:w-1/4">
          <Sidebar
            onApplyFilters={(newFilters) => {
              setFilters(newFilters);
              setPage(1);
            }}
          />
        </div>

        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movies={[movie]} />
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnTv;
