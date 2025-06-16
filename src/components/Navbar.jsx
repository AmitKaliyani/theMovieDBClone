import { FaSearch, FaPlus, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import Img1 from "../assets/imageMovies.svg";
import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useSearchRef } from "../context/SearchContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMoviesOpen, setIsMoviesOpen] = useState(false);
  const [isTvShowOpen, setIsTvShowOpen] = useState(false);
  const [isPeopleOpen, setIsPeopleOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMoviesOpen, setIsMobileMoviesOpen] = useState(false);
  const [isMobileTvOpen, setIsMobileTvOpen] = useState(false);
  const [isMobilePeopleOpen, setIsMobilePeopleOpen] = useState(false);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);

  const navigate = useNavigate();
  const searchInputRef = useSearchRef();

  const isLoggedIn = sessionStorage.getItem("auth");

  const handleLogout = () => {
    sessionStorage.removeItem("auth");
    toast.warn("You have been logged out.");
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-blue-950 text-white flex justify-between items-center px-4 py-3 md:px-8 flex-wrap">
        {/* Mobile View */}
        <div className="flex md:hidden w-full justify-between items-center">
          <FaBars
            className="cursor-pointer text-white text-2xl"
            onClick={() => setIsMobileMenuOpen(true)}
          />
          <img src={Img1} alt="logo" className="w-[120px]" onClick={() => navigate("/")} />
          <FaSearch
            className="cursor-pointer text-white text-xl"
            onClick={() => searchInputRef.current.focus()}
          />
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex flex-wrap items-center space-x-4 xl:space-x-6 w-full justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={Img1}
              alt="logo"
              className="w-[160px] cursor-pointer"
              onClick={() => navigate("/")}
            />
            <ul className="flex space-x-4 xl:space-x-6 text-sm xl:text-base">
              {/* Movies */}
              <li
                className="group cursor-pointer font-semibold relative"
                onMouseEnter={() => setIsMoviesOpen(true)}
                onMouseLeave={() => setIsMoviesOpen(false)}
              >
                Movies
                <ul
                  className={`absolute top-6 left-0 mt-1 bg-white text-gray-900 shadow-lg rounded-md overflow-hidden z-50 transition-all text-sm  duration-300 ease-in-out ${
                    isMoviesOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                >
                  <li>
                    <NavLink to={"/movie"} className="block px-4 py-2 hover:bg-gray-100">
                      Popular
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/movie/now-playing"} className="block px-4 py-2 hover:bg-gray-100">
                      Now Playing
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/movie/upcoming"} className="block px-4 py-2 hover:bg-gray-100">
                      Upcoming
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/movie/top-rated"} className="block px-4 py-2 hover:bg-gray-100">
                      Top Rated
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* TV Shows */}
              <li
                className="group cursor-pointer font-semibold relative"
                onMouseEnter={() => setIsTvShowOpen(true)}
                onMouseLeave={() => setIsTvShowOpen(false)}
              >
                TV Shows
                <ul
                  className={`absolute top-8 left-0 mt-1 bg-white text-gray-900 shadow-lg rounded-md overflow-hidden z-50 transition-all duration-300 ease-in-out ${
                    isTvShowOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                >
                  <li>
                    <NavLink to={"/tv"} className="block px-4 py-2 hover:bg-gray-100">
                      Popular
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/tv/airing-today"} className="block px-4 py-2 hover:bg-gray-100">
                      Airing Today
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/tv/on-the-air"} className="block px-4 py-2 hover:bg-gray-100">
                      On TV
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/tv/top-rated"} className="block px-4 py-2 hover:bg-gray-100">
                      Top Rated
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li
                className="group cursor-pointer font-semibold relative"
                onMouseEnter={() => setIsPeopleOpen(true)}
                onMouseLeave={() => setIsPeopleOpen(false)}
              >
                People
                <ul
                  className={`absolute top-8 left-0 mt-1 bg-white text-gray-900 shadow-lg rounded-md overflow-hidden z-50 transition-all duration-300 ease-in-out ${
                    isPeopleOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                >
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"> <NavLink to={'/people'} >Popular People</NavLink></li>
                </ul>
              </li>

              {/* More */}
              <li
                className="group cursor-pointer font-semibold relative"
                onMouseEnter={() => setIsMoreOpen(true)}
                onMouseLeave={() => setIsMoreOpen(false)}
              >
                More
                <ul
                  className={`absolute top-8 left-0 mt-1 bg-white text-gray-900 shadow-lg rounded-md overflow-hidden z-50 transition-all duration-300 ease-in-out ${
                    isMoreOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                >
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Discussions</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Leaderboard</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Support</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">API Documentation</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">API for Business</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="flex items-center space-x-4 xl:space-x-6 text-sm xl:text-base mt-3 md:mt-0">
            <FaPlus className="cursor-pointer text-white text-lg" />
            <li className="list-none font-semibold border px-2 py-1 rounded hover:bg-white hover:text-black cursor-pointer">
              EN
            </li>

            {!isLoggedIn ? (
              <li className="list-none font-semibold">
                <NavLink to={"/login"} className="px-4 py-2">
                  Login
                </NavLink>
              </li>
            ) : (
              <div className="flex items-center gap-2">
                <FaUserCircle className="text-2xl" />
                <button
                  onClick={handleLogout}
                  className="font-semibold border px-2 py-1 rounded hover:bg-white hover:text-black"
                >
                  Sign Out
                </button>
              </div>
            )}

            <FaSearch
              className="cursor-pointer text-white text-lg"
              onClick={() => searchInputRef.current.focus()}
            />
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-950 z-50 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b border-white">
          <img src={Img1} alt="logo" className="w-[100px]" onClick={() => navigate('/')}  />
          <FaTimes
            className="cursor-pointer text-white text-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
        <ul className="p-4 space-y-2 text-white">
          {/* Mobile Menus */}
          <li className="font-semibold cursor-pointer" onClick={() => setIsMobileMoviesOpen(!isMobileMoviesOpen)}>
            Movies
          </li>
          {isMobileMoviesOpen && (
            <ul className="pl-4 text-sm   space-y-1">
              <li><NavLink to={"/movie"} className="block">Popular</NavLink></li>
              <li><NavLink to={"/movie/now-playing"} className="block">Now Playing</NavLink></li>
              <li><NavLink to={"/movie/upcoming"} className="block">Upcoming</NavLink></li>
              <li><NavLink to={"/movie/top-rated"} className="block">Top Rated</NavLink></li>
            </ul>
          )}

          <li className="font-semibold cursor-pointer" onClick={() => setIsMobileTvOpen(!isMobileTvOpen)}>
            TV Shows
          </li>
          {isMobileTvOpen && (
            <ul className="pl-4 text-sm space-y-1">
              <li><NavLink to={"/tv"} className="block">Popular</NavLink></li>
              <li><NavLink to={"/tv/airing-today"} className="block">Airing Today</NavLink></li>
              <li><NavLink to={"/tv/on-the-air"} className="block">On TV</NavLink></li>
              <li><NavLink to={"/tv/top-rated"} className="block">Top Rated</NavLink></li>
            </ul>
          )}

          <li className="font-semibold cursor-pointer" onClick={() => setIsMobilePeopleOpen(!isMobilePeopleOpen)}>
            People
          </li>
          {isMobilePeopleOpen && (
            <ul className="pl-4 text-sm space-y-1">
              <li className="block cursor-pointer"> <NavLink to={'/people'}>Popular People </NavLink> </li>
            </ul>
          )}

          <li className="font-semibold cursor-pointer" onClick={() => setIsMobileMoreOpen(!isMobileMoreOpen)}>
            More
          </li>
          {isMobileMoreOpen && (
            <ul className="pl-4 text-sm space-y-1">
              <li className="block cursor-pointer">Discussions</li>
              <li className="block cursor-pointer">Leaderboard</li>
              <li className="block cursor-pointer">Support</li>
              <li className="block cursor-pointer">API Documentation</li>
              <li className="block cursor-pointer">API for Business</li>
            </ul>
          )}

          {!isLoggedIn ? (
            <>
              <li className="list-none font-semibold">
                <NavLink to={"/login"} className="px-4 py-2 block">
                  Login
                </NavLink>
              </li>
              <li className="font-semibold cursor-pointer">Join TMDB</li>
            </>
          ) : (
            <>
              <li className="flex items-center gap-2 px-4 py-2 font-semibold">
                <FaUserCircle className="text-xl" />
                
              </li>
              <li
                className="font-semibold cursor-pointer px-4 py-2 hover:bg-blue-800"
                onClick={handleLogout}
              >
                Sign Out
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
