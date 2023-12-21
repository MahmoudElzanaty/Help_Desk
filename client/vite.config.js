// vite.config.js

import { defineConfig } from 'vite';

export default defineConfig({
  // other configuration options...

  resolve: {
    alias: {
      'socket.io-client': 'socket.io-client/dist/socket.io.js',
    },
  },
});
