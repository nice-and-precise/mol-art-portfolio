/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        clay: {
          50: '#faf8f5',
          100: '#f5f1ea',
          300: '#d4c4b0',
          500: '#9c8671',
          700: '#6b5544',
          900: '#3d2f24',
        },
        glaze: {
          blue: '#7fa5a3',
          green: '#8b9d83',
          cream: '#f0ebe3',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
