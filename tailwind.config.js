const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.js'],
  theme: {
    screens: {
      mini: '375px',
      xs: '420px',
      sm: '640px',
      md: '768px',
      mid: '860px',
      lg: '992px',
      xl: '1240px',
      '2xl': '1440px',
      '3xl': '1780px',
    },
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      black: '#121212',
      alert: '#EB4F4F',
      success: '#4F8DEB',
      button3dGradient: 'rgba(161, 202, 255, 0.35)',
      button3dGradientHover: 'rgba(208, 229, 255, 0.35)',
      button3dGradientDisable: 'rgba(244, 244, 244, 0.6)',
      primary: {
        50: '#F7F4FF',
        100: '#E5E0F8',
        200: '#DCD6F5',
        300: '#CBC1F1',
        400: '#B9ADEC',
        500: '#A898E7',
        600: '#8E7ECD',
        700: '#7464B3',
        800: '#5B4B98',
        900: '#4E3E8B',
      },
      gray: {
        50: '#F9F9F9',
        100: '#F4F4F4',
        200: '#EEEEEE',
        300: '#E9E9E9',
        400: '#DDDDDD',
        500: '#D2D2D2',
        600: '#C7C7C7',
        700: '#A5A5A5',
        800: '#838383',
        900: '#606060',
        1000: '#4F4F4F',
        1100: '#3E3E3E',
        1200: '#2D2D2D',
        1300: '#1C1C1C',
      },
    },
    container: {
      center: true,
    },
    extend: {
      transitionProperty: {
        height: 'height',
      },
      backgroundImage: {
        'gradient-to-center':
          'radial-gradient(100% 100% at 32% 100%, var(--tw-gradient-stops))',
        'gradient-to-center-hover':
          'radial-gradient(134% 134% at 87% 0%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['Noto Sans TC', ...defaultTheme.fontFamily.sans],
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        'button-3d': `0px 2px 2px rgba(0, 0, 0, 0.2), inset 0px -4px 0px #5B4B98`,
        'button-3d-rounded': `inset 0px -2px 0px #5B4B98`,
        'button-3d-hover': `0px 2px 2px rgba(0, 0, 0, 0.2), inset 0px -4px 0px #7464b3`,
        'button-3d-rounded-hover': `inset 0px -2px 0px #7464b3`,
        'button-3d-disable': `0px 2px 2px rgba(0, 0, 0, 0.2), inset 0px -4px 0px #838383`,
        'button-3d-rounded-disable': `inset 0px -2px 0px #838383`,
        navbar: '0px 2px 10px rgba(0, 0, 0, 0.04)',
        'navbar-dropdown': '0px 1px 4px rgba(116, 100, 179, 0.4)',
        'mobile-nav': '0px -2px 8px rgba(0,0,0,0.1)',
        card: '2px 2px 6px rgba(0, 0, 0, 0.15)',
        filter: '1px 1px 2px rgba(65,49,126,0.2)',
        login: '2px 2px 5px rgba(37,2,81,0.25)',
        'login-card': '4px 5px 10px rgba(0,0,0,0.15)',
        profile: '0px 4px 4px rgba(0, 0, 0, 0.1)',
        'm-profile': '0px -4px 4px rgba(0, 0, 0, 0.1)',
        chat: '1px 1px 3px rgba(0, 0, 0, 0.15)',
        channel: '0px 0px 15px rgba(0, 0, 0, 0.2)',
        'channel-header': '0px 1px 4px rgba(0, 0, 0, 0.16)',
        '3d':
          'inset -1px -1px 1px rgba(24, 0, 75, 0.25), inset 1px 1px 1px rgba(239, 205, 251, 0.35);',
        'dot-carousel':
          '9984px 0 0 0 #5B4B98, 9999px 0 0 0 #5B4B98, 10014px 0 0 0 #5B4B98',
      },
      animation: {
        'dot-carousel': 'dotCarousel 1.5s infinite linear',
      },
    },
  },
  variants: {
    stroke: ['responsive', 'hover', 'group-hover', 'focus'],
    fill: ['responsive', 'hover', 'group-hover', 'focus'],
    animation: ['responsive'],
  },
  plugins: [],
}
