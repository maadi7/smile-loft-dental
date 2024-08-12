// pages/_app.jsx
import type { AppProps } from "next/app";
import { Playfair_Display, Nunito, Raleway } from '@next/font/google';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../styles/global.css"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const playfairDisplay = Playfair_Display({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const nunito = Nunito({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});
const raleway = Raleway({
  weight: ['400', '600', '700'],
  subsets: ['latin']
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-playfair: ${playfairDisplay.style.fontFamily};
          --font-raleway: ${raleway.style.fontFamily};
          --font-nunito: ${nunito.style.fontFamily};
            --font-satoshi: 'Satoshi', sans-serif;
        }
      `}</style>
      <Navbar/>
      <Component {...pageProps} />
      <Footer/>
      <style jsx global>{`
        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@400&display=swap');
      `}</style>
    </>
  );
}

export default MyApp;
