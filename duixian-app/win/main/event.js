import { globalShortcut } from 'electron/main'

export default win => {
  globalShortcut.register('F11', (event, arg) => {
    win.openDevTools()
  })
}
