import {defineConfig} from "@playwright/test"
import dotenv from "dotenv"

const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env.local"
dotenv.config({ path: envFile })

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3000'
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000'
  }
})