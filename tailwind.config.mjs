/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Space Grotesk"', 'Inter', 'sans-serif'],
                mono: ['"Geist Mono"', 'monospace'],
                body: ['Inter', 'sans-serif'],
            },
            colors: {
                background: '#0f172a', // Deep Slate
                primary: '#14b8a6',    // Neon Teal
                secondary: '#8b5cf6',  // Violet
                slate: {
                    850: '#1e293b', // Custom slate for cards
                    900: '#0f172a',
                }
            }
        },
    },
    plugins: [],
}
