import React from "react";
import { BACKGROUND_IMG } from "../utils/constants";

const Error = () => {
  return (
    <div className="relative">
      {/* Background image */}
      <img
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src={BACKGROUND_IMG}
        alt="background_img"
      />
      {/* Content overlay */}
      <div className="mt-96 absolute inset-0 flex justify-center items-center z-10">
        <div className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Sorry!!
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            We can't find the trailer.
            {/* You can add a link here if needed */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error;
