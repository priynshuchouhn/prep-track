/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
      extend: {
        animation: {
          shine: "shine var(--duration) infinite linear",
        },
        keyframes: {
          shine: {
            "0%": {
              "background-position": "0% 0%",
            },
            "50%": {
              "background-position": "100% 100%",
            },
            to: {
              "background-position": "0% 0%",
            },
          },
        },
      },
    },
  };