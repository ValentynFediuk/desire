import { defineConfig } from 'vite';

export default defineConfig({
    root: './', // The root directory for the project (relative to this file)

    // Configure the build output
    build: {
        outDir: 'dist', // Output directory for production build
        assetsDir: 'assets', // Directory to store assets in the output build
    },

    // Define how to serve static assets
    publicDir: 'public', // Static assets are served directly from this directory

    // Enable base path configuration if needed for deployment
    base: '/', // Change this if you deploy your app in a sub-folder

    // Configuration for the dev server
    server: {
        open: true, // Automatically open the app in the browser on server start
        port: 3000, // Set the development server port
    },
});
