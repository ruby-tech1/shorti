/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: "#222",
      white: "#fff",
      redDark: "#842029",
      primary: {
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#a5b4fc",
        400: "#818cf8",
        500: "#6366f1",
        600: "#4f46e5",
        700: "#4338ca",
        800: "#3730a3",
        900: "#312e81",
      },
      grey: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Open Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
    },
    extend: {
      transitionProperty: {
        all: {
          transitionProperty: "áll",
          transitionDuration: "300ms",
          transitionTimingFunction: "ease-in-out",
        },
      },
      transitionDuration: {
        300: "300ms",
      },
      keyframes: {
        bouncee: {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.3)",
          },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        bouncee: "bouncee 2s ease-in-out  infinite",
      },
      width: {
        fixedWidth: "600px",
        fluidWidth: "90vw",
      },
      maxWidth: {
        maxWidth: "1120px",
      },
    },
  },
  plugins: [],
};
