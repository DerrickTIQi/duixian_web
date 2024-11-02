import { ipcRenderer } from 'electron'
import { contextBridge } from 'electron/renderer'

// import { electronAPI } from '@electron-toolkit/preload'
// contextBridge.exposeInMainWorld('electron', electronAPI)

contextBridge.exposeInMainWorld('SDK', {
  send,
})

contextBridge.exposeInMainWorld('electron', {
  getVersion: () => ipcRenderer.invoke('get-version'),
  getMacAddress: () => ipcRenderer.invoke('get-mac-address'),
  windowAllClosed: () => ipcRenderer.invoke('window-all-closed'),
  onUpdateavailable: (callback) => ipcRenderer.on('update-available', callback),
  startupdate: (text) => { ipcRenderer.send('startupdatesends', text) },
  onUpdate: (callback) => ipcRenderer.on('update', callback),
  onDownloaded: (callback) => ipcRenderer.on('downloaded', callback),
  installsend: (text) => { ipcRenderer.send('installsends', text) },
  getPackage: () => ipcRenderer.invoke('get-package'),
})

function send(type, data) {
  ipcRenderer.send(type, data)
}
