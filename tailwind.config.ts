import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
   
    extend: {
      colors:{
         primary: "#313131",
         bgtop: "#f7f6f3",
         bgbottom: "#E7E4DA",
         toptext: "#747474",
         box1: "#E7E4DA",
         box2: "#CFC9B5",
         subtext: "#2C312B"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        nunito: ['var(--font-nunito)', 'sans-serif'],
        satoshi: ['var(--font-satoshi)', 'sans-serif'],
        raleway: ['var(--font-raleway)', 'sans-serif'],
        brogadier: ['Brogadier', 'sans-serif'],
      },
      screens: {
        'xsm': '485px',
        'custom-lg': '1150px',
        'custom-md': '850px',
        
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
export default config;
