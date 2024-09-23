// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite';

const APP_BASE_URL = 'http://13.200.28.168';

export default defineConfig({
  define: {
    APP_BASE_URL: JSON.stringify(APP_BASE_URL),
  },
});
