const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let scopedWindow;


function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'windows/main/index.html'));
    mainWindow.menuBarVisible = false;
    //mainWindow.webContents.openDevTools();
}

function createScopedWindow() {
    scopedWindow = new BrowserWindow({
        width: 800,
        height: 600,
        fullscreen: true,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        resizable: false,
        skipTaskbar: true,
        focusable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    scopedWindow.loadFile(path.join(__dirname, 'windows/scope/index.html'));
    scopedWindow.setAlwaysOnTop(true, 'screen-saver');
    scopedWindow.setIgnoreMouseEvents(true);
}

app.whenReady().then(() => {
    createMainWindow();
    createScopedWindow();

    mainWindow.on('closed', () => {
        scopedWindow.close();
        mainWindow = null;
    });
});




ipcMain.on('change-scoped', (event, pathToScoped) => {
    if (scopedWindow) {
        scopedWindow.webContents.send('update-scoped', pathToScoped);
    }
});

ipcMain.handle('get-available-scopes', async () => {
    const dirPath = path.join(__dirname, 'assets/img/scopes');
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                return reject(err);
            }

            const scopedFiles = files
                .filter(file => {
                    const ext = path.extname(file).toLowerCase();
                    return ['.jpg', '.jpeg', '.png'].includes(ext);
                })
                .map(file => path.join(dirPath, file));

            resolve(scopedFiles);
        });
    });
});

