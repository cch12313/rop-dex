/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        // RO 風格配色 - 溫暖可愛的色調
        ro: {
          // 主色調 - 溫暖的橘粉色
          primary: {
            50: '#fff7f1',
            100: '#ffe8d9',
            200: '#ffd0b3',
            300: '#ffab7d',
            400: '#ff7a45',
            500: '#ff5722',
            600: '#e63900',
            700: '#cc3300',
            800: '#b32d00',
            900: '#992600',
          },
          // 輔助色 - 可愛的粉色
          pink: {
            50: '#fdf2f8',
            100: '#fce7f3',
            200: '#fbcfe8',
            300: '#f9a8d4',
            400: '#f472b6',
            500: '#ec4899',
            600: '#db2777',
            700: '#be185d',
            800: '#9d174d',
            900: '#831843',
          },
          // 自然色 - 溫和的綠色
          green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
          },
          // 中性色 - 溫暖的米色
          neutral: {
            50: '#fefdfb',
            100: '#fcfaf7',
            200: '#f7f3ed',
            300: '#f1e8d9',
            400: '#e4d5c1',
            500: '#d4c2a4',
            600: '#c2a982',
            700: '#a68b5b',
            800: '#8b7355',
            900: '#725f46',
          },
          // 天空色 - 柔和的藍色
          sky: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
          }
        }
      },
      fontFamily: {
        // RO 風格字體
        'ro-title': ['"Fredoka"', '"Noto Sans TC"', '"PingFang TC"', 'sans-serif'],
        'ro-body': ['"Noto Sans TC"', '"PingFang TC"', 'system-ui', 'sans-serif'],
        'ro-cute': ['"Bubblegum Sans"', '"Fredoka"', 'cursive'],
        'ro-display': ['"Fredoka"', '"Bubblegum Sans"', 'sans-serif'],
      },
      borderRadius: {
        // 可愛的圓角
        'ro-sm': '8px',
        'ro-md': '12px',
        'ro-lg': '16px',
        'ro-xl': '20px',
      },
      boxShadow: {
        // 柔和的陰影效果
        'ro-soft': '0 4px 20px rgba(255, 87, 34, 0.1)',
        'ro-card': '0 8px 25px rgba(0, 0, 0, 0.08)',
        'ro-hover': '0 12px 35px rgba(255, 87, 34, 0.15)',
      },
      backgroundImage: {
        // 漸變背景
        'ro-primary': 'linear-gradient(135deg, #ff5722 0%, #ff7a45 100%)',
        'ro-soft': 'linear-gradient(135deg, #fff7f1 0%, #fce7f3 100%)',
        'ro-sky': 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      }
    },
  },
  plugins: [],
}