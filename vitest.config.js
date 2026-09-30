import { defineConfig } from 'vitest/config'
import path from "path"

export default defineConfig({
    test:{
        environment:'jsdom',
        globals:true,
        setupFiles:'tests/setup.js',
        testTimeout:70000
    },
    resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
})
