import pkg from 'electron-updater'
import { base, isDev } from '../config/index.js'
import path from 'path'
// import { ipcRenderer } from 'electron'
// const fs = require('fs');
const { autoUpdater } = pkg
import process from 'process'
import { dialog, ipcMain } from 'electron/main'
var mainWin = null;
let isinstall = true

const checkUpdate = (win, ipcMain) => {

  autoUpdater.autoDownload = false; // 自动下载
  autoUpdater.autoInstallOnAppQuit = true; // 应用退出后自动安装
  mainWin = win;


  const checkForUpdates = () => {
    // 检测是否有更新包并通知
    autoUpdater.checkForUpdatesAndNotify().catch();
  };
  // 应用启动时检查更新
  checkForUpdates();

  // 设置隔一定时间检查一次更新
  setInterval(checkForUpdates, 1000 * 60 * 5);

  // 监听渲染进程的 install 事件，触发退出应用并安装
  if (isinstall) {
    isinstall = false
    ipcMain.handle("install", () => autoUpdater.quitAndInstall());
  }

  autoUpdater.on("update-available", (info) => { 
    console.log("有新版本需要更新");
    mainWin.webContents.send("update-available",info);
    ipcMain.on("startupdatesends", (event, text) => {
      autoUpdater.downloadUpdate();
    })
  });
  autoUpdater.on("update-not-available", (info) => {
    console.log("无需更新");
  });
  //下载进度
  autoUpdater.on("download-progress", (prog) => {
    mainWin.webContents.send("update", {
      speed: Math.ceil(prog.bytesPerSecond / 1000), // 网速
      percent: Math.ceil(prog.percent), // 百分比
    });
  });
  //事件监听器的回调函数接收三个参数：
  //event：一个对象，提供了事件相关的信息和功能
  //releaseNotes：一个字符串，包含了新版本的发布说明或更新日志。
  //releaseName：一个字符串，通常包含了新版本的名称或版本号。
  autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName) => {
    //更新已经被下载到本地，以便进一步处理
    mainWin.webContents.send("downloaded");
    ipcMain.on("installsends", (event, text) => {
      autoUpdater.quitAndInstall();
    })
  });
};

// module.exports = checkUpdate;
export default checkUpdate;
