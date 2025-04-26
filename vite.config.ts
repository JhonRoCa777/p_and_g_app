
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

import { BASE_URL } from './src/env';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: BASE_URL,
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  }
})
