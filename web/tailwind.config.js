/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        // RO 風格配色 - 經典藍金色調
        ro: {
          // 主色調 - RO 經典深藍色
          primary: {
            50: '#eff6ff',
            100: '#dbeafe', 
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
          },
          // 輔助色 - RO 金色元素
          accent: {
            50: '#fefce8',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
          },
          // 保持粉色作為可愛元素 (重新命名為 pink)
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
          // 中性色 - 清爽的藍灰色
          neutral: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
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
        // 柔和的陰影效果 - 藍色主題
        'ro-soft': '0 4px 20px rgba(59, 130, 246, 0.1)',
        'ro-card': '0 8px 25px rgba(0, 0, 0, 0.08)',
        'ro-hover': '0 12px 35px rgba(59, 130, 246, 0.15)',
        'ro-accent': '0 8px 25px rgba(245, 158, 11, 0.12)',
      },
      backgroundImage: {
        // 漸變背景 - 藍金色主題
        'ro-primary': 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
        'ro-accent': 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
        'ro-soft': 'linear-gradient(135deg, #eff6ff 0%, #fefce8 100%)',
        'ro-sky': 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      }
    },
  },
  plugins: [],
}