import { app, BrowserWindow, ipcMain } from 'electron/main'
// import pkg from 'electron-updater'
import os from 'os';
import { preloadPath } from '../config/index.js'
// import configureAutoUpdate from "../utils/updater.js";

import checkUpdate from "../utils/updater.js";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// 获取当前模块的文件名和目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 确认 package.json 的路径
const packageJsonPath = path.join(__dirname, '../package.json'); // 假设 package.json 在上一级目录

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));


export const createWindow = (opitons) => {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minHeight: 900,
    minWidth: 1440,
    show: false,
    autoHideMenuBar: true, // 隐藏菜单栏
    webPreferences: {
      nodeIntegration: true, // 允许前端使用node
      contextIsolation: true,
      preload: preloadPath,
    },
    ...opitons
  })



  win.on('ready-to-show', () => {
    win.show()
    checkUpdate(win, ipcMain);
  })
  // 打开开发者工具
  // win.webContents.openDevTools();

  return win
}

// 版本号
ipcMain.handle('get-version', () => {
  return app.getVersion();
});

// 退出软件
ipcMain.handle('window-all-closed', () => {
  app.quit();
});

ipcMain.handle('get-package', () => {
  return packageJson;
});

const getMacAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.mac;
      }
    }
  }
  return null;
};

ipcMain.handle('get-mac-address', () => {
  return getMacAddress();
});
