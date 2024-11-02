import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'path'

// const __dirname = import.meta.dirname
export const __dirname = dirname(fileURLToPath(import.meta.url))

export const env = process.env.NODE_ENV || 'production'
export const isDev = env !== 'production'

export const base = resolve(__dirname, '../')

export const preloadPath = resolve(__dirname, '../preload.mjs')

export const webPath = resolve(__dirname, '../public/web/index.html')
export const adminPath = resolve(__dirname, '../public/admin/index.html')
export const webUrl = `http://localhost:5173/#`
