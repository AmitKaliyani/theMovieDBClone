import React, { useRef } from 'react';
import BgImg from '../assets/bg.jpeg';
import { useNavigate } from 'react-router';

const HeroComp = () => {
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleSearch = () => {
    const query = inputRef.current.value.trim();
    if (query) {
      navigate(`/search/${query}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full text-white">
    
      <div
        className="h-[300px] w-full bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${BgImg})` }}
      ></div>

      
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Welcome.</h1>
        <p className="text-lg sm:text-xl md:text-2xl mt-2 max-w-[900px]">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>

        <div className="mt-4 w-full max-w-6xl bg-white rounded-full overflow-hidden shadow-lg flex">
          <input
            type="text"
            placeholder="Search for a movie, tv show, person...."
            ref={inputRef}
            onKeyDown={handleKeyDown}
            className="w-full px-5 py-3 text-gray-900 focus:outline-none text-sm sm:text-base"
          />
          <button
            onClick={handleSearch}
            className="px-5 sm:px-6 py-3 bg-teal-400 text-white font-semibold hover:text-black rounded-full"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroComp;
