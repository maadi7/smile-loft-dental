// pages/_app.tsx
import type { AppProps } from "next/app";
import Head from "next/head";
import { Playfair_Display, Nunito, Raleway } from '@next/font/google';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../styles/global.css"
import { LoadingProvider } from '../context/LoadingContext';
import Loader from '../components/Loader';
import { useLoading } from '../context/LoadingContext';
import dynamic from "next/dynamic";
const Navbar = dynamic(()=>import("../components/Navbar"), {});
const Footer = dynamic(()=>import("../components/Footer"), {});


const playfairDisplay = Playfair_Display({
  weight: ['400', '700', '600'],
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

function AppContent({ Component, pageProps, router }: AppProps) {
  const { isLoading } = useLoading();

  return (
    <>
      <style jsx global>{`
        :root {
          --font-playfair: ${playfairDisplay.style.fontFamily};
          --font-raleway: ${raleway.style.fontFamily};
          --font-nunito: ${nunito.style.fontFamily};
          --font-satoshi: 'Satoshi', sans-serif;
           --font-brogadier: 'Brogadier', sans-serif;
        }
      `}</style>
<Head>
  <title>Smile Loft Dental</title>
  <meta
    name="description"
    content="Smile Loft Dental: Your trusted dental care provider offering comprehensive dental services with a focus on patient comfort with advanced technology."
  />
  <link rel="canonical" href="https://smileloftdental.com/" />
  <link rel="icon" href="/assets/fav.png" />
  {/* OG Tags */}
  <meta
    property="og:title"
    content="Smile Loft Dental: Your trusted dental care provider offering comprehensive dental services with a focus on patient comfort with advanced technology."
  />
  <meta property="og:image" content="/assets/TestimonialDentist.png" />
  <meta property="og:type" content="website" />
  <meta
    property="og:description"
    content="Smile Loft Dental: Your trusted dental care provider offering comprehensive dental services with a focus on patient comfort with advanced technology."
  />
  <meta property="og:url" content="https://smileloftdental.com/" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta
    property="twitter:title"
    content="Smile Loft Dental - Quality Dental Care"
  />
  <meta
    property="twitter:description"
    content="Smile Loft Dental: Your trusted dental care provider offering comprehensive dental services with a focus on patient comfort with advanced technology."
  />
  <meta property="twitter:url" content="https://smileloftdental.com/" />
  <meta property="twitter:image" content="/assets/TestimonialDentist.png" />
</Head>
      {isLoading && <Loader />}
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <style jsx global>{`
        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@400&display=swap');
      `}</style>
    </>
  );
}

function MyApp(appProps: AppProps) {
  return (
    <LoadingProvider>
      <AppContent {...appProps} />
    </LoadingProvider>
  );
}

export default MyApp;