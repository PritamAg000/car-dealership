/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          dark: "#0B132B",
          card: "#1C2541",
          border: "#3A506B",
          accent: "#F59E0B",
          gold: "#D97706",
          goldHover: "#B45309",
          text: "#F8FAFC",
          muted: "#94A3B8",
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
