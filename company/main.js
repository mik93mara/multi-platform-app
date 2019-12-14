const { app, BrowserWindow, protocol, Menu } = require('electron');
const url = require('url');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
const isMac = process.platform === 'darwin';

function createWindow() {
    const WEB_FOLDER = '';
    const PROTOCOL = 'file';
    protocol.interceptFileProtocol(PROTOCOL, (request, callback) => {
        // // Strip protocol
        let url = request.url.substr(PROTOCOL.length + 1);

        // Build complete path for node require function
        url = path.join(__dirname, WEB_FOLDER, url);

        // Replace backslashes by forward slashes (windows)
        // url = url.replace(/\\/g, '/');
        url = path.normalize(url);

        console.log(url);
        callback({ path: url });
    });
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
        title: 'Auth App',
        frame: true,
        resizable: false,
        transparent: false,
    });

    // and load the index.html of the app.
    win.loadURL(
        url.format({
            pathname: 'index.html',
            protocol: PROTOCOL + ':',
            slashes: true,
        })
    );

    // Open the DevTools.
    // win.webContents.openDevTools();

    win.on('page-title-updated', function(e) {
        e.preventDefault();
    });

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('window-all-closed', app.quit);
app.on('before-quit', () => {
    mainWindow.removeAllListeners('close');
    mainWindow.close();
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const template = [
    {
        label: 'File',
        submenu: [isMac ? { role: 'close' } : { role: 'quit' }],
    },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
