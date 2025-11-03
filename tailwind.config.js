/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundSize: {
        '100-4': '100% 4px',
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(255, 255, 255, 0) 100%)',
      },
      colors: {
        'dark-primary': '#0a0a20',
        'secondary-color': '#00ffff',
        'yellow-color': '#ffff00',
        'roxo-color': '#6a0dad',
        'roxo-light-color': '#ff00ff',
      },
    },
  },
  plugins: [],
}

