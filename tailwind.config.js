/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#7e409a',
        'primary-dark': '#5F2E8A',
        'primary-light': '#8e4ba7',
        secondary: '#687076',
        accent: '#7F00FF',
        background: '#ffffff',
        surface: '#f8fafc',
        border: '#e5e7eb',
        text: {
          primary: '#11181C',
          secondary: '#687076',
          muted: '#9CA3AF',
        },
        card: {
          background: '#ffffff',
          border: '#e5e7eb',
        },
      },
    },
  },
  plugins: [],
}

