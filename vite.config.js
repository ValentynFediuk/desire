import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// 🧠 Функція, яка шукає всі .html в папці "pages/"
function getHtmlInputs(dir = 'pages') {
    const inputs = {};

    // перевіряємо чи існує папка
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
    root: './', // Корінь проекту

    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                ...getHtmlInputs('pages') // Автоматично додає HTML-файли з pages/
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
