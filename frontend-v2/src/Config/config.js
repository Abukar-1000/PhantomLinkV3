
const time = {
    oneMinute: 60 * 1000,
    oneHour: 60 * 60 * 1000,
    oneDay: 24 * 60 * 60 * 1000,
}

const address = process.env.REACT_APP_IS_PROD === "true"? 
                    process.env.REACT_APP_PROD_BASE_ADDRESS : 
                    process.env.REACT_APP_DEV_BASE_ADDRESS;

const baseAddress = address;
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
