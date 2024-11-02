// import { ipcMain, screen, BrowserWindow } from 'electron/main'
// import { webPath, webUrl, isDev, adminPath } from '../../config/index.js'

// import { createWindow } from '../index.js'

// ipcMain.on('openWeb', (event, path) => {
//   console.log('[ipcMain] openWeb', path)

//   const lastWin = BrowserWindow.getAllWindows().pop()
//   const [x, y] = lastWin.getPosition()

//   const win = createWindow({
//     x: x + 88,
//     y,
//   })

//   if (isDev) {
//     const url = `${webUrl}/${path}`
//     win.loadURL(url)
//     // win.webContents.openDevTools()
//   } else {
//     // win.loadFile(webPath + '/#/' + path)
//     win.loadURL(`file://${webPath}` + '#/' + path)
//   }
// })

// ipcMain.on('openAdmin', (event, path) => {
//   console.log('adminPath', adminPath)

//   console.log('[ipcMain] openAdmin', path)

//   const file = `file://${adminPath}` + '#/' + path

//   console.log('file', file)

//   const win = createWindow()
//   win.loadURL(file)
// })

import { ipcMain, screen, BrowserWindow } from 'electron/main'
import { webPath, webUrl, isDev, adminPath } from '../../config/index.js'

import { createWindow } from '../index.js'
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// 获取当前模块的文件名和目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 确认 package.json 的路径
const packageJsonPath = path.join(__dirname, '../../package.json'); // 假设 package.json 在上一级目录

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

ipcMain.on('openWeb', (event, path) => {
  let wintitle = `${packageJson.productName} V${packageJson.version} -${path.title}`

  let windows = BrowserWindow.getAllWindows();
  let showwin
  windows.forEach((win, index) => {
    const { title } = win;
    if (title == wintitle) {
      showwin = win
    }
  });
  if (showwin == null || showwin == undefined) {
    const lastWin = BrowserWindow.getAllWindows().pop()
    const [x, y] = lastWin.getPosition()
    const win = createWindow({
      x: x + 88,
      y
    })

    win.webContents.on('did-finish-load', () => {
      setTimeout(() => {
        win.webContents.send('set-window-title', {
          title: wintitle,
        });
      }, 500)
    });

    if (isDev) {
      const url = `${webUrl}/${path.path}`
      win.loadURL(url)
      // win.webContents.openDevTools()
    } else {
      // win.loadFile(webPath + '/#/' + path)
      win.loadURL(`file://${webPath}` + '#/' + path.path)
    }
  } else {
    showwin.focus();
    showwin.webContents.send('add-window-model', {
      path: path.path
    });
  }


})

ipcMain.on('openAdmin', (event, path) => {
  console.log('adminPath', adminPath)

  console.log('[ipcMain] openAdmin', path)

  const file = `file://${adminPath}` + '#/' + path

  console.log('file', file)

  const win = createWindow()
  win.loadURL(file)
})
