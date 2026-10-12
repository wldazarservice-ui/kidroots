import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Version affichee dans les rapports de bugs (commit Netlify, sinon la date du build)
  define: { __APP_VERSION__: JSON.stringify((process.env.COMMIT_REF || '').slice(0, 7) || new Date().toISOString().slice(0, 10)) },
})
