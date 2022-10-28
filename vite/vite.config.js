import { defineConfig } from 'vite'
import { swcReactRefresh } from 'vite-plugin-swc-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [swcReactRefresh()],
  esbuild: {
    jsx: 'automatic'
  }
})
