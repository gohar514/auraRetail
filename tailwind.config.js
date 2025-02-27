/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        tenorSans: ['"Tenor Sans"', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        oliveGreen: '#4E5A37',
        darkGreen: "#09271c",
        cream: "#FCF7F1",
        lightCream: "#FFFCF7",
        foreground: "var(--foreground)",
      },
      keyframes: {
        'aura-animation': {
          '0%, 100%': { 'clip-path': 'inset(0 0 0 0)' },
          '50%': { 'clip-path': 'inset(0 100% 0 0)' },
        },
      },
      animation: {
        'aura-fade': 'aura-animation 4s ease-in-out infinite 1s',
      },
      
      
    },
  },
  plugins: [],
};
