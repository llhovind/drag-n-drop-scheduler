/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        dust: {
          '0%': {
            opacity: '0',
            transform: 'translateY(8px) scale(0.7)'
          },
          '35%': {
            opacity: '0.9',
            transform: 'translateY(0) scale(1)'
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-6px) scale(1.15)'
          }
        },
        dustBurst: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.5)'
          },
          '30%': {
            opacity: '1',
            transform: 'scale(1)'
          },
          '100%': {
            opacity: '0',
            transform: 'scale(2.5)'
          }
        },

        dust1: {
          '100%': { transform: 'translate(-24px, -10px)' }
        },
        dust2: {
          '100%': { transform: 'translate(26px, -8px)' }
        },
        dust3: {
          '100%': { transform: 'translate(-18px, 12px)' }
        },
        dust4: {
          '100%': { transform: 'translate(22px, 14px)' }
        },

        poofText: {
          '0%': { opacity: '0', transform: 'scale(0.6)' },
          '40%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(1.2)' }
        }
      },
      animation: {
        dust: 'dust 320ms ease-out forwards',
        dustBurst: 'dustBurst 440ms ease-out forwards',
        dust1: 'dust1 420ms ease-out forwards',
        dust2: 'dust2 420ms ease-out forwards',
        dust3: 'dust3 420ms ease-out forwards',
        dust4: 'dust4 420ms ease-out forwards',
        poofText: 'poofText 440ms ease-out forwards'
      }
    },
  },
  plugins: [],
}
