/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./navigation/**/*.{js,ts,jsx,tsx,mdx}",
    "./container/**/*.{js,ts,jsx,tsx,mdx}",
    "./appLogo/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend:{
        keyframes:{
          'zoom-fadeIn': {
            '0%': {
              '-webkit-transform': 'scale(0.7)',
              transform: 'scale(0.7)',
              opacity:0,
            },
            '30%': {
              '-webkit-transform': 'scale(1)',
              transform: 'scale(1)',
              opacity:1,
            },
          },
          'slideIn-from-top': {
            '0%': {
              '-webkit-transform': 'translateY(-500px)',
              transform: 'translateY(-500px)',
              opacity:0,
            },
            '100%': {
              '-webkit-transform': 'translateY(50px)',
              transform: 'translateY(50px)',
              opacity:1,
            },
          },
          'slide-In': {
            '0%': {
              '-webkit-transform': 'translateX(-200px)',
              transform: 'translateX(-200px)',
            },
            '100%': {
              '-webkit-transform': 'translateX(0px)',
              transform: 'translateX(0px)',
            },
          },
        },
        animation: {
          'zoom-fadeIn':'zoom-fadeIn 15s ease-out forward',
          'slideIn-from-top': 'slideIn-from-top 0.3s ease-in',
          'slide-In': 'slide-In 0.2s ease-out',
        },
      },
    screens: {
        'xxsmc': '300px',
        //extral extral small screen customised.
  
        'xsmc': '360px',
        //extral small screen customised.
  
        'smc': '500px',
        //small screen customised.
  
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
    
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'mdc': '900px',
        //medium screen customised.
    
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
    
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
        
        'xlc': '1500px',
        // => xl screen customised
        '2xl': '1536px',
        '3xl': '1700px',
        '4xl': '2000px',
        // => @media (min-width: 1536px) { ... }
      }
  },
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "pastel",
      "aqua",
      "garden",
      "winter",
    ],
  },
  plugins: [require("daisyui")]
}