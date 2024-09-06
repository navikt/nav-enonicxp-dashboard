import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sass from 'sass';

const isLocal = process.env.VITE_ENV === 'local';

export default defineConfig({
    build: {
        outDir: 'build',
    },
    base: process.env.VITE_PUBLIC_URL,
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                implementation: sass,
            },
        },
    },
});
