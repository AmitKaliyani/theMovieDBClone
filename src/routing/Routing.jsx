import React from 'react';
import { Routes, Route } from 'react-router';
import Home from '../pages/Home';

import Popular from '../pages/movies/Popular';
import NowPlaying from '../pages/movies/NowPlaying';
import TopRated from '../pages/movies/TopRated';
import UpComing from '../pages/movies/UpComing';
import PopularTvShow from '../pages/tvShows/PopularTvShow';
import AiringToday from '../pages/tvShows/AiringToday';
import OnTv from '../pages/tvShows/OnTv';
import TopRatedTvShow from '../pages/tvShows/TopRatedTvShow';
import Login from '../components/Login';
import Signup from '../components/SignUp';
import SignUp from '../components/SignUp';
import SearchResults from '../components/SearchResults';
import MovieDetail from '../pages/MovieDetail';
import TvDetail from '../pages/TvDetail';
import People from '../pages/People';


const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/movie" element={<Popular />} />
        <Route path="/movie/now-playing" element={<NowPlaying />} />
        <Route path="/movie/upcoming" element={<UpComing />} />
        <Route path="/movie/top-rated" element={<TopRated />} />
        <Route path="/tv" element={<PopularTvShow />} />
        <Route path="/tv/airing-today" element={<AiringToday />} />
        <Route path="/tv/on-the-air" element={<OnTv />} />
        <Route path="/tv/top-rated" element={<TopRatedTvShow/>} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/tv/:id" element={<TvDetail />} />
        <Route path="/people" element={<People />} />




    </Routes>
  );
};

export default Routing;
