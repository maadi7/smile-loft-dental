import React, { useEffect, useState } from 'react';
import BannerVideo from "../../assets/bannerVideo.mp4";
import useTranslation from '../../hooks/useTranslation';

const Banner = () => {
  const { translate, language } = useTranslation();
  const [translatedText, setTranslatedText] = useState({
    title: "Welcome to",
    button: "BOOK AN APPOINTMENT",
  });

  useEffect(() => {
    if(language === "en"){
      setTranslatedText({
        title: "Welcome to",
        button: "BOOK AN APPOINTMENT",
      })
      return;
    }
    const translateText = async () => {
      const translatedTitle = await translate(translatedText.title);
    
      const translatedButton = await translate(translatedText.button);

      setTranslatedText({
        title: translatedTitle.text || translatedText.title,
      
        button: translatedButton.text || translatedText.button,
      });
    };

    translateText();
  }, [translate, language]);

  

  return (
    <div className="relative h-[130vh] w-full overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={BannerVideo}
        autoPlay
        loop
        muted
      ></video>
      <div className="relative z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-40">
        <div className="text-center">
          <h1 style={{ fontFamily: 'var(--font-brogadier)' }} className="text-white text-5xl md:text-[110px] mb-4 leading-[50px] md:leading-[110px] ">
            <span>{translatedText.title}{language === "es"? " a" : ""}</span><br />
            <span>{"Smile Loft"}</span>
          </h1>
          <button className="mt-4 px-8 py-3 text-lg md:text-xl font-nunito text-white bg-white bg-opacity-20 backdrop-filter backdrop-blur-md rounded-full shadow-xl">
            {translatedText.button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
