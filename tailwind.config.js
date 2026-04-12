/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pistachio: {
          50: '#F4F8F2',
          100: '#E4EEDF',
          200: '#C8DCC0',
          400: '#8DB87E',
          600: '#5C8A4A',
          800: '#34522A',
        },
        blush: {
          50: '#FDF6F4',
          100: '#F9E8E3',
          200: '#F2CCBF',
          400: '#E5967E',
          600: '#C96A52',
        },
        cream: {
          50: '#FDFBF7',
          100: '#F7F2EA',
          200: '#EDE5D4',
        },
        taupe: {
          400: '#A89880',
          600: '#7A6A58',
        },
        brown: {
          900: '#2C2018',
        },
        gold: {
          300: '#E8C97A',
          500: '#C9973A',
        },
      },
      fontFamily: {
        display: ['"Pinyon Script"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['5rem', { lineHeight: '1.1', letterSpacing: '0.01em' }],
        h1: ['3.5rem', { lineHeight: '1.15', letterSpacing: '0.03em' }],
        h2: ['2.5rem', { lineHeight: '1.2', letterSpacing: '0.04em' }],
        h3: ['1.75rem', { lineHeight: '1.3', letterSpacing: '0.02em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        body: ['1rem', { lineHeight: '1.7' }],
        caption: ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
        label: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.12em' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(44,32,24,0.07)',
        card: '0 2px 12px rgba(44,32,24,0.05), 0 8px 32px rgba(44,32,24,0.06)',
        elevated: '0 8px 40px rgba(44,32,24,0.12)',
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease both',
        'fade-in': 'fadeIn 0.5s ease both',
        'count-flip': 'countFlip 0.4s ease both',
        'slide-left': 'slideLeft 0.4s ease both',
        'slide-right': 'slideRight 0.4s ease both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        countFlip: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      transitionTimingFunction: {
        gentle: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

