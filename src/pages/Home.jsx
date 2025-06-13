import React from 'react'
import HeroComp from '../components/HeroComp'
import SearchBar from '../components/SearchBar'
import TrendingSection from '../components/TrendingSection'
import TrailerSection from '../components/TrailerSection'
import PopularSection from '../components/PopularSection'
import FreeToWatch from '../components/FreeToWatch'
import JoinSection from '../components/JoinSection'

const Home = () => {
  return (
    <div>
      <SearchBar  />
      <HeroComp />
      <TrendingSection />
      <TrailerSection />
      <PopularSection />
      <FreeToWatch />
      <JoinSection />
    </div>
  )
}

export default Home
