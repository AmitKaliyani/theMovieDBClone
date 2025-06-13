import { createContext, useRef, useContext } from 'react';

const SearchContext = createContext();

export const useSearchRef = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const searchInputRef = useRef(null);

  return (
    <SearchContext.Provider value={searchInputRef}>
      {children}
    </SearchContext.Provider>
  );
};
