const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    changeScoped: (pathToScoped) => ipcRenderer.send('change-scoped', pathToScoped),  
    onScopedUpdate: (callback) => ipcRenderer.on('update-scoped', (event, pathToScoped) => callback(pathToScoped)),
    getAvailableScopes: () => ipcRenderer.invoke('get-available-scopes'),
});
