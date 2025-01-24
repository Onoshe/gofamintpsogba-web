/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './container/**/*.{js,ts,jsx,tsx,mdx}',
    './header/**/*.{js,ts,jsx,tsx,mdx}',
    './footer/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      margin: {
        320: '320px',
      },
      width: {
        190: '190px',
        275: '275px',
        300: '300px',
        340: '340px',
        350: '350px',
        656: '656px',
        880: '880px',
        508: '508px',
      },
      height: {
        80: '80px',
        340: '340px',
        370: '370px',
        420: '420px',
        510: '510px',
        600: '600px',
        685: '685px',
        800: '800px',
        '90vh': '90vh',
      },
      flex: {
        0.7: '0.7 1 0%',
      },
      maxHeight: {
        370: '370px',
      },
      minWidth: {
        210: '210px',
        350: '350px',
        620: '620px',
      },
      textColor: {
        lightGray: '#F1EFEE',
        primary: '#FAFAFA',
        secColor: '#efefef',
        navColor: '#BEBEBE',
      },
      fontFamily:{
        meriendOne:['Merienda_One'],
        permanent_Marker:['Permanent_Marker'],
        archivo:['Archivo_Black'],
      },
      backgroundColor: {
        mainColor: 'rgb(239, 235, 235)',
        blackOverlay: 'rgba(0, 0 ,0 ,0.5)',
      },
      keyframes: {
        'slide-in': {
          '0%': {
            '-webkit-transform': 'translateX(-200px)',
            transform: 'translateX(-200px)',
          },
          '100%': {
            '-webkit-transform': 'translateX(0px)',
            transform: 'translateX(0px)',
          },
        },
    
        'slide-fwd': {
          '0%': {
            '-webkit-transform': 'translateZ(0px)',
            transform: 'translateZ(0px)',
          },
          '100%': {
            '-webkit-transform': 'translateZ(160px)',
            transform: 'translateZ(160px)',
          },
        },
        'slide-in-top': {
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
        'slide-in-text': {
          '0%': {
            '-webkit-transform': 'translateX(-300px)',
            transform: 'translateX(-300px)',
            opacity:0,
          },
          '10%': {
            '-webkit-transform': 'translateX(0px)',
            transform: 'translateX(0px)',
            opacity:0.5,
          },
          '20%, 90%': {
            opacity:1,
          },
          '100%': {
            opacity:0,
          },
        },
        'bounceCard':{
          '0%': {
            '-webkit-transform': 'translateY(-5px)',
            transform: 'translateY(-5px)',
          },
          '50%': {
            '-webkit-transform': 'translateY(5px)',
            transform: 'translateY(5px)',
          },
          '100%': {
            '-webkit-transform': 'translateY(-5px)',
            transform: 'translateY(-5px)',
          },
          
        },
        'scaleCard':{
          '0%': {
            '-webkit-transform': 'scale(1)',
            transform: 'scale(1)',
          },
          '100%': {
            '-webkit-transform': 'scale(1.15)',
            transform: 'scale(1.15)',
          },
          
        },
        'slide-snackbar': {
          '0%': {
            '-webkit-transform': 'translateY(-60px)',
            transform: 'translateY(-60px)',
            opacity:0,
          },
          '10%': {
            '-webkit-transform': 'translateY(0px)',
            transform: 'translateY(0px)',
            opacity:1,
          },
          '90%': {
            '-webkit-transform': 'translateY(0px)',
            transform: 'translateY(0px)',
            opacity:1,
          },
          '100%': {
            '-webkit-transform': 'translateY(-60px)',
            transform: 'translateY(-60px)',
            opacity:0,
          },
        },
        'loop-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        }
      },
      
      animation: {
        'slide-in': 'slide-in 0.5s ease-out',
        'slide-fwd': ' slide-fwd 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-in-top': 'slide-in-top 0.5s ease-in',
        'slide-in-text': 'slide-in-text 15s ease-out infinite',
        'bounceCard0': 'bounceCard 2s ease-in-out infinite 0s',
        'bounceCard1': 'bounceCard 2s ease-in-out infinite 1s',
        'bounceCard2': 'bounceCard 1.5s ease-in infinite 2s',
        'scaleCard': 'scaleCard 0.5s ease-in-out forwards',
        'slide-snackbar': 'slide-snackbar 3s ease-in',
        'loop-scroll': 'loop-scroll 50s linear infinite',
      },
      transitionProperty: {
        height: 'height',
      },
    },
    cursor: {
      'zoom-in': 'zoom-in',
      pointer: 'pointer',
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
      // => @media (min-width: 1536px) { ... }
    },
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
