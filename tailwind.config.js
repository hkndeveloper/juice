/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'emerald': {
                    DEFAULT: '#10B981',
                    light: '#34D399',
                    dark: '#059669',
                },
                'beige': {
                    DEFAULT: '#F5F5DC',
                    light: '#FFF8DC',
                    dark: '#E1E1C0',
                },
                'forest': '#228B22',
                'off-white': '#FAFAFA',
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                heading: ['"Orbitron"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
