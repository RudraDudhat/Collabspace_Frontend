// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react' // Assuming you use React
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(), // If using React
//     tailwindcss(), // This initializes Tailwind
//   ],
//   server: { // Add server configuration
//     proxy: { // Configure proxy rules
//       '/api': { // Proxy requests starting with /api
//         target: 'http://localhost:5000', // Your backend server address
//         changeOrigin: true, // Change the origin of the host header to the target URL
//       },
//     },
//   },
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), // Only use the React plugin
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})

