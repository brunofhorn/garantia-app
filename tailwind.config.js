/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        appBg: '#E5E7EB',
        appText: '#0F172A',
        appMuted: '#6B7280',
        appBorder: '#D1D5DB',
        appPrimary: '#2583E5',
        appSuccess: '#22C55E',
        appSuccessSoft: '#CFF5DC',
        appDanger: '#DC2626',
        appDangerSoft: '#F9DEDE',
        appWarning: '#C98900',
        appCard: '#F5F6F8',
      },
      borderRadius: {
        xl2: '20px',
      },
    },
  },
  plugins: [],
};
