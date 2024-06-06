import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: [
      // Add this to include all your JavaScript files containing JSX
      'src/**/*.js',
      'src/**/*.jsx',
    ],
  },
})
