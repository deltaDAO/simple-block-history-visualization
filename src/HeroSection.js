import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import scrollTo from "gatsby-plugin-smoothscroll";

const HeroSection = () => {
  return (
    <div className="m-4 min-h-screen">
      <div className="mt-20 lg:mt-40 text-left">
        <div className="flex justify-start flex-col lg:flex-row gap-4">
          <div>
            <h1 className="text-6xl font-semibold text-gray-900 leading-none">
              Gaia-X Test Network Hackathon
            </h1>
            <div className="mt-6 text-xl font-light text-true-gray-500 antialiased">
              See the on-chain statistics.
            </div>
            <button
              onClick={() => scrollTo("#data")}
              className="mt-6 px-8 py-4 rounded-full font-normal tracking-wide bg-gradient-to-b from-blue-600 to-blue-700 text-white outline-none focus:outline-none hover:shadow-lg hover:from-blue-700 transition duration-200 ease-in-out"
            >
              Check out the data
            </button>
          </div>
          <StaticImage
            src="./images/dolphin-grid.svg"
            alt="A dolphin"
            className="max-w-sm"
          />
        </div>
      </div>
      <div className="mt-12 lg:mt-32 lg:ml-20 text-left">
        <bottom
          type="button"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-cool-gray-100 text-gray-800 animate-bounce hover:text-gray-900 hover:bg-cool-gray-50 transition duration-300 ease-in-out cursor-pointer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </bottom>
      </div>
    </div>
  );
};
export default HeroSection;
