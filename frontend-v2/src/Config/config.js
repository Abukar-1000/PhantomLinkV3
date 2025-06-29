
const time = {
    oneMinute: 60 * 1000,
    oneHour: 60 * 60 * 1000,
    oneDay: 24 * 60 * 60 * 1000,
}

const baseAddress = "http://10.0.0.178:80"
// const baseAddress = "http://127.0.0.1:5086"
export const config = {
    socket: `${baseAddress}/socket`,
    process: `${baseAddress}/process`,
    mouse: `${baseAddress}/mouse`,
    screenBrodcast: `${baseAddress}/screenBrodcast`,
    hardware: {
        performance: `${baseAddress}/hardware/performance`
    },
    intervals: {
        display: {
            refresh: time.oneMinute * 3
        },
        process: {
            refresh: time.oneMinute
        }
    }
}
