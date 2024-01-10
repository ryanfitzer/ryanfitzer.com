/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/index.html'],
    theme: {
        extend: {
            fontFamily: {
                display: ['Caprasimo'],
            },
        },
        screens: {
            sm: '0',
            lg: '621px',
        },
    },
};
