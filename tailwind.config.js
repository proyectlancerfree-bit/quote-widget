module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "mountain": "url('/montain.webp')",
      },
      fontFamily: {
        merriweather: ["Merriweather Sans", "serif"], 
      },
      animation: {
        "slow-move": "slow 60s linear infinite",
        "fast-move": "faster 30s linear infinite",
      },
    },
  },
  plugins: [],
};
