module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        pulse: "pulse 2s infinite",
      },
      colors: {
        indigo: {
          500: "#6366F1",
          600: "#4F46E5",
        },
        purple: {
          500: "#8B5CF6",
        },
        pink: {
          500: "#EC4899",
        },
      },
    },
  },
  plugins: [],
};
