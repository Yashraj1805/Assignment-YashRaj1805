/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07111F',
        panel: '#0C1729',
        panelAlt: '#12213A',
        line: 'rgba(148, 163, 184, 0.18)',
        accent: '#5EEAD4',
        accentStrong: '#14B8A6',
        roseSoft: '#FB7185',
        goldSoft: '#FBBF24',
        successSoft: '#34D399',
      },
      boxShadow: {
        glow: '0 24px 60px rgba(8, 15, 31, 0.45)',
        card: '0 18px 40px rgba(3, 9, 20, 0.28)',
      },
      backgroundImage: {
        aurora:
          'radial-gradient(circle at top left, rgba(20, 184, 166, 0.18), transparent 28%), radial-gradient(circle at top right, rgba(96, 165, 250, 0.16), transparent 24%), linear-gradient(180deg, rgba(12, 23, 41, 0.96), rgba(5, 11, 22, 1))',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(18px, -12px, 0) scale(1.04)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-120%) skewX(-18deg)' },
          '100%': { transform: 'translateX(220%) skewX(-18deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeUp: 'fadeUp 0.7s ease-out both',
        drift: 'drift 12s ease-in-out infinite',
        shimmer: 'shimmer 2.8s ease-in-out infinite',
        pulseSoft: 'pulseSoft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
