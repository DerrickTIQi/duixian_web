import { webPath, webUrl, isDev } from '../../config/index.js'

import { createWindow } from '../index.js'

import './ipc.js'
import bindEvent from './event.js'

export const createMain = () => {
  const win = createWindow()

  if (isDev) {
    win.loadURL(webUrl)
    // win.webContents.openDevTools()
  } else {
    // win.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`)
    win.loadFile(webPath)
  }

  bindEvent(win)

  return win
}
