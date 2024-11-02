import { app, BrowserWindow, globalShortcut } from 'electron/main'

// Object.defineProperty(app, 'isPackaged', {
//   get() {
//     return true
//   },
// })

import { createMain } from './win/main/index.js'

app.whenReady().then(() => {
  createMain()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMain()
  })

  // globalShortcut.register('F10', () => {
  //   console.log('F10')
  // })

  // updater()
})
