import React from "react";
import Img1 from '../assets/imageMovies.svg';

const Footer = () => {
  return (
    <footer className="bg-[#032541] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col  gap-10 md:gap-12 md:flex-row md:justify-between">
        <div className="flex flex-col items-start gap-6 md:w-1/4">
          <img src={Img1} alt="logo" className="w-[100px] sm:w-[120px]" />
          <button className="bg-white md:text-base text-sm whitespace-nowrap  text-cyan-600 font-bold px-5 py-2   rounded-md hover:bg-gray-100 transition">
            JOIN THE COMMUNITY
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm md:w-3/4">

          <div>
            <h3 className="font-bold mb-3">THE BASICS</h3>
            <ul className="space-y-2">
              <li>About TMDB</li>
              <li>Contact Us</li>
              <li>Support Forums</li>
              <li>API Documentation</li>
              <li>System Status</li>
            </ul>
          </div>

        
          <div>
            <h3 className="font-bold mb-3">GET INVOLVED</h3>
            <ul className="space-y-2">
              <li>Contribution Bible</li>
              <li>Add New Movie</li>
              <li>Add New TV Show</li>
            </ul>
          </div>

         
          <div>
            <h3 className="font-bold mb-3">COMMUNITY</h3>
            <ul className="space-y-2">
              <li>Guidelines</li>
              <li>Discussions</li>
              <li>Leaderboard</li>
            </ul>
          </div>

         
          <div>
            <h3 className="font-bold mb-3">LEGAL</h3>
            <ul className="space-y-2">
              <li>Terms of Use</li>
              <li>API Terms of Use</li>
              <li>Privacy Policy</li>
              <li>DMCA Policy</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
