export function setConfig(filename) {
    return {
        failureThreshold: '0.01',
        failureThresholdType: 'percent',
        customSnapshotsDir: `./snapshots/`,
        customSnapshotIdentifier: filename,
        noColors: true
    }
}
export const browserConfig = {
    ignoreHTTPSErrors: true,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
}

export const TIMEOUT = 10000
