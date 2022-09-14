module.exports = {
    mode: 'jit',
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: '#4461F2'
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
    important: '#tailwind-selector',
};


