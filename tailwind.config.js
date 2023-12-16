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
                zinc: {
                    850: "#2B2B2B",
                    900: "#18181b",
                    950: "#0e0e0f",
                    1000: "#09090b",
                },
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                fadeOut: {
                    "0%": { opacity: "1" },
                    "100%": { opacity: "0" },
                },
            },
            animation: {
                fadeIn: "fadeIn 0.5s ease-out",
                fadeOut: "fadeOut 0.5s ease-out",
            },
        },
    },

    plugins: [],
};
