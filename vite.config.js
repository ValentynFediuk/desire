import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

function getHtmlInputs(dir = 'pages') {
    const inputs = {};

    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach(file => {
            if (file.endsWith('.html')) {
                const name = file.replace('.html', '');
                inputs[name] = resolve(__dirname, dir, file);
            }
        });
    }

    return inputs;
}

export default defineConfig({
    root: './',

    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                ...getHtmlInputs('pages')
            }
        },
    },

    publicDir: 'public',

    base: '/',

    server: {
        open: true,
        port: 3000,
    },
});
