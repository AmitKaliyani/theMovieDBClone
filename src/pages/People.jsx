import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const People = () => {
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/person/popular`, {
          params: {
            api_key: '37950764c84c26ca876141ed8bfeb702',
            page,
          },
        });
        setPeople(prev => [...prev, ...res.data.results]);
      } catch (error) {
        console.error('Failed to fetch people:', error);
      }
    };

    fetchPeople();
  }, [page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 md:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center md:text-left">
        Popular People
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {people.map(person => (
          <Link key={person.id}  className="group">
            <div className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden">
              <img
                src={person.profile_path
                  ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
                  : `https://via.placeholder.com/300x450?text=No+Image`}
                alt={person.name}
                className="w-full h-64 sm:h-72 md:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-3">
                <h2 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                  {person.name}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {person.known_for?.map(p => p.title || p.name).slice(0, 2).join(', ') || 'Actor'}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={loadMore}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition shadow-md"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default People;
