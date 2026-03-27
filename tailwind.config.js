/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0a0f',
        'dark-bg2': '#0f0f18',
        'dark-bg3': '#141420',
        'dark-surface': '#1a1a28',
        'dark-surface2': '#20202f',
        'dark-border': '#2a2a3f',
        'dark-border2': '#353550',
        'dark-text': '#e8e8f0',
        'dark-muted': '#6b6b8a',
        'dark-dim': '#3d3d5c',
        'accent-primary': '#7c6af7',
        'accent-secondary': '#a08cf7',
      },
      fontFamily: {
        'mono': "'Space Mono', monospace",
        'display': "'Syne', sans-serif",
        'body': "'DM Sans', sans-serif",
      },
    },
  },
  plugins: [],
}
