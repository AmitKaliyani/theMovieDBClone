import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSearchRef } from '../context/SearchContext';
import { useNavigate } from 'react-router';

const SearchBar = () => {
  const searchInputRef = useSearchRef();
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const query = searchInputRef.current.value.trim();
      if (query) {
        navigate(`/search/${query}`);
      }
    }
  };

  return (
    <div className='flex items-center mt-1 px-10 gap-3 sticky top-0 z-10  bg-white'>
      <FaSearch className="cursor-pointer" />
      <input
        type="text"
        ref={searchInputRef}
        onKeyDown={handleKeyDown}
        className='w-full italic p-2 outline-none text-gray-500'
        placeholder='Search for a movie, tv show, person ....'
      />
    </div>
  );
};

export default SearchBar;
