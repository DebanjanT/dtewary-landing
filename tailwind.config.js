/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        panel:{
          green:{
            dark:"#089747",
            light:"#4AB441",
            normal:"#07A94D",
          },
          sand:{
            light:"#849264",
            dark:"#515F3F"
          },
          blue:{
            dark:"#26A4E9",
            light:"#B2D9EA",
            normal:"#50C4EA", 
          },
          gray:{
            light:"#A1B9CB",
            dark:"#597A84"
          }
        },
        brand:{
          green: "#367C2B",
          onGreen:"#ffffff",
          yellow:"#FFDE00",
          black:"#333",
          blackLight:"#454545",
          blackLighter:"#767676",
          background:"#d5d5d5",
          blue:"#2c6fbb",
          blueLight:"#c7dbf2",
          blueDark:"#1f4e84"
        }
      }
    },
  },
  plugins: [],
}

