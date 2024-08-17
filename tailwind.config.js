/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      gridColumn: {
        'span-2-4': '2 / 4',
        'span-4-6': '4 / 6',
      },
      screens: {
        244:'244px',
        475: '475px',
        237: '237px',
        280: '280px',
        300: '300px',
        344: '344px',
        531: '531px',
        627: '627px',
        785: '785px',
        992:'992px',
        994: '994px',
        1097: '1097px',
        1157: '1157px',
        1207:'1207px',
        1309 : '1309px',
        1320:'1320px'
      },
      transitionDuration: {
        '200s': '200s', 
      },
     

    },
  },
  plugins: [],
}

