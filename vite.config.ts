import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sass from 'sass';

const port = parseInt(process.env.VITE_PORT || '3000', 10);

export default defineConfig({
    build: {
        outDir: 'build',
    },
    server: {
        port,
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
