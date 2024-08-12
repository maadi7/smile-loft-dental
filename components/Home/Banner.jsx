import React from 'react';
import BannerVideo from "../../assets/bannerVideo.mp4";

const Banner = () => {
  return (
    <div className="relative h-[130vh] w-full overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={BannerVideo}
        autoPlay
        loop
        muted
      ></video>
      <div className="relative z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <div className="text-center">
          <h1 className="text-white text-4xl md:text-[110px] mb-4 leading-[130px] font-playfair">
            Welcome to <br /> Smile Loft
          </h1>
          <button className="mt-4 px-8 py-3 text-lg md:text-xl font-nunito text-white bg-white bg-opacity-20 backdrop-filter backdrop-blur-md rounded-full shadow-xl">
            BOOK AN APPOINTMENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
