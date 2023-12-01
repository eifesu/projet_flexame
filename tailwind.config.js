/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                inter: ["Inter"],
                jakarta: ["Plus Jakarta Sans"],
            },
            colors: {
                "brand-yellow": "#E6F34C",
            },
        },
    },

    plugins: [],
};
