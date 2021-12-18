module.exports = {
  purge: [],
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        circuit:
          "url('https://res.cloudinary.com/sonobe/image/upload/v1639840503/samples/download_ual2cs.svg')",
      },
    },
    minHeight: {
      0: "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
      screen: "100vh",
    },
    minWidth: {
      0: "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
      "right-sm": "calc(100% - 80px)",
      "right-lg": "calc(100% - 256px)",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
