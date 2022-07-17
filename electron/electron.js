const {app, BrowserWindow, protocol, dialog} = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev')

const { autoUpdater } = require("electron-updater");
const log = require('electron-log');

function createWindow() {
    /*
    * 넓이 1920에 높이 1080의 FHD 풀스크린 앱을 실행시킵니다.
    * */
    const win = new BrowserWindow({
        width:1080,
        height:720,
        webPreferences: { nodeIntegration: true, contextIsolation: false, webSecurity: false }
    },);

    // win.webContents.openDevTools()

    /*
    * ELECTRON_START_URL을 직접 제공할경우 해당 URL을 로드합니다.
    * 만일 URL을 따로 지정하지 않을경우 (프로덕션빌드) React 앱이
    * 빌드되는 build 폴더의 index.html 파일을 로드합니다.
    * */
    const startUrl = isDev ? 'http://localhost:3000' : url.format({
        pathname: path.join(__dirname, '/../dist/index.html'),
        protocol: 'file:',
        slashes: true
    })

    /*
    * startUrl에 배정되는 url을 맨 위에서 생성한 BrowserWindow에서 실행시킵니다.
    * */
    win.loadURL(startUrl);

    if (isDev) win.webContents.openDevTools();
}

// app.whenReady().then(() => {
//   protocol.registerFileProtocol('atom', (request, callback) => {
//     const url = request.url.substr(7);
//     callback({ path: path.normalize(`${__dirname}/${url}`) });
//   })
// })

/* Updater ======================================================*/

autoUpdater.on('checking-for-update', (event) => {
  log.info("Checking for update")
})

autoUpdater.on('update-available', (event) => {
  log.info("Update Available : " + event.version)
})

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    log.info("Update downloaded")
    const dialogOpts = {
        type: 'info',
        buttons: ['재시작', '나중에'],
        title: 'Application Update',
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail: '새로운 버전이 다운로드 되었습니다. 업데이트를 적용하기 위해 앱을 재시작하세요.'
    }

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
        log.info("returnValue: ", returnValue.response)
        if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
})

autoUpdater.on('download-progress', (progressObj) => {
  log.info("Progress:" + progressObj.percent + '%')
})

autoUpdater.on('error', (message,error) => {
    log.info("ERROR!!!!")
    log.info(error)
})

/* Electron =====================================================*/


app.on('ready', () => {
  // protocol.registerFileProtocol('atom', (request, callback) => {
  //   const pathname = decodeURIComponent(request.url.replace('file://', ''));
  //   callback({ path: path.normalize(pathname) })
  // });
  createWindow()

  // 자동 업데이트 등록
  if (!isDev) {
    autoUpdater.checkForUpdatesAndNotify();
  }
});

/** [생명주기] 모든 창이 닫히면 자동으로 앱 종료 */
app.on('window-all-closed', () => {
  app.quit();
});
