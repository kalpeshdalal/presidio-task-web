/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
const colors = require("tailwindcss/colors");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      "inter": "inter-regular",
      "inter-medium": "inter-medium",
      "inter-bold": "inter-bold",
      "inter-semibold": "inter-semi-bold",
    },
    colors: {
      ...colors,
      white: "white",
      muted:"",
      "white-shade": {
        10: "rgba(255,255,255,.1)",
        20: "rgba(255,255,255,.2)",
        30: "rgba(255,255,255,.3)",
        40: "rgba(255,255,255,.4)",
        50: "rgba(255,255,255,.5)",
        60: "rgba(255,255,255,.6)",
        70: "rgba(255,255,255,.7)",
        80: "rgba(255,255,255,.8)",
        90: "rgba(255,255,255,.9)",
        100: "rgba(255,255,255,1)",
      },
      black: "black",
      transparent: "transparent",
      body: {
        10: "rgba(17, 24, 39, .1)",
        20: "rgba(17, 24, 39, .2)",
        30: "rgba(17, 24, 39, .3)",
        40: "rgba(17, 24, 39, .4)",
        50: "rgba(17, 24, 39, .5)",
        60: "rgba(17, 24, 39, .6)",
        70: "rgba(17, 24, 39, .7)",
        80: "rgba(17, 24, 39, .8)",
        90: "rgba(17, 24, 39, .9)",
        100: "rgba(17, 24, 39, 1)",
      },
      primary: "rgba(222, 227, 47, 1)",
      secondary: "rgba(0, 232, 109, 0.20)",
      
    },
    extend: {
      screens: {
        "3xl": "1840px",
        ...defaultTheme.screens,
      },
      borderWidth: {
        1: "1px",
      },
      spacing: {
        "sidebar-width": "var(--sidebar-width)",
      },
      backgroundImage: {
        "purple-blue":
          "linear-gradient(134deg, #F539F8 0%, #C342F9 41.68%, #5356FB 100%)",
        "purple-blue-2":
          "linear-gradient(134deg, #F539F8 0%, #C342F9 41.68%, #5356FB 100%)",
        blob: "linear-gradient(64deg, rgba(245, 57, 248, 0.11) 0%, rgba(83, 86, 251, 0.11) 27.03%, rgba(103, 83, 251, 0.11) 47.15%, rgba(193, 86, 194, 0.11) 80.73%, rgba(55, 69, 87, 0.11) 99.99%)",
      },
      backgroundColor:{
        mainBg:"rgba(255,255,255,.07)",
      }
    },
  },
  plugins: [],
};
