import { toast } from 'react-toastify'

export const makeHandler = severity => (text, options) =>
    toast[severity](text, {
        className: `toast-${severity}`,
        ...options
    })

const proxy = {
    success: makeHandler('success'),
    error: makeHandler('error'),
    warn: makeHandler('warn'),
    info: makeHandler('info')
}

export default proxy
