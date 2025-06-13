import React from "react";
import JoinImg from "../assets/join.png";
import { useNavigate } from "react-router";

const JoinSection = () => {
  const navigate = useNavigate()
  return (
    <section className="relative bg-purple-900 bg-opacity-90 text-white py-16 sm:py-20 md:py-24 overflow-hidden flex items-center h-[350px] ">
  
      <div className="absolute inset-0">
        <img
          src={JoinImg}
          alt="Background"
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>

    
      <div className="relative z-9 w-full px-4 sm:px-6 md:px-12 max-w-6xl  text-left">
        <h1 className="text-2xl mt-6 sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
          Join Today
        </h1>
        <p className="text-base  sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed">
          Get access to maintain your own <em>custom personal lists</em>, track
          what you've seen and search and filter for{" "}
          <em>what to watch next</em> — regardless if it's in theatres, on TV,
          or available on popular streaming services like{" "}
          <strong>Netflix, Amazon Prime Video, Apple TV+, Crunchyroll</strong>,
          and <strong>JioHotstar</strong>.
        </p>
        <button className="px-6 py-3 bg-blue-900 hover:bg-blue-700 font-semibold text-base sm:text-lg transition rounded-md mb-5"
        onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
      </div>
    </section>
  );
};

export default JoinSection;
