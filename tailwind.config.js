/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#C4704F', // warm terracotta
        'primary-foreground': '#FDFCFA', // warm off-white
        
        // Secondary Colors
        'secondary': '#8B5A3C', // deeper earth tone
        'secondary-foreground': '#FDFCFA', // warm off-white
        
        // Accent Colors
        'accent': '#D4A574', // golden sand tone
        'accent-foreground': '#2C1810', // rich dark brown
        
        // Background Colors
        'background': '#FDFCFA', // warm off-white
        'surface': '#F7F5F2', // slightly deeper neutral
        
        // Text Colors
        'text-primary': '#2C1810', // rich dark brown
        'text-secondary': '#6B5B4F', // medium brown
        
        // State Colors
        'success': '#7A9B76', // muted sage green
        'success-foreground': '#FDFCFA', // warm off-white
        'warning': '#D4A574', // golden sand tone
        'warning-foreground': '#2C1810', // rich dark brown
        'error': '#B85450', // warm red-brown
        'error-foreground': '#FDFCFA', // warm off-white
        
        // Border Colors
        'border': 'rgba(107, 91, 79, 0.12)', // medium brown with opacity
        'border-focus': '#C4704F', // warm terracotta
        
        // Muted Colors
        'muted': '#F7F5F2', // slightly deeper neutral
        'muted-foreground': '#6B5B4F', // medium brown
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['Source Sans Pro', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
        'sans': ['Inter', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        'slide-down': 'slideDown 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        'slide-up': 'slideUp 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        'scale-in': 'scaleIn 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'warm': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      boxShadow: {
        'warm-sm': '0 1px 2px 0 rgba(44, 24, 16, 0.08)',
        'warm': '0 4px 6px -1px rgba(44, 24, 16, 0.08), 0 2px 4px -1px rgba(44, 24, 16, 0.08)',
        'warm-md': '0 8px 25px -5px rgba(44, 24, 16, 0.08), 0 4px 10px -3px rgba(44, 24, 16, 0.08)',
        'warm-lg': '0 16px 40px -12px rgba(44, 24, 16, 0.08), 0 8px 16px -4px rgba(44, 24, 16, 0.08)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}