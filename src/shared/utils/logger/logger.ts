import pino from 'pino'

import { env } from '../../env'

export const logger = pino({
    enabled: (env.isProd || env.isDev) && !process.env.CI,
    formatters: {
        level: (label) => {
            return { level: label.toUpperCase() }
        },
    },
    level: env.APP_LOG_LEVEL,
    redact: { paths: ['password'] },
    transport: env.isProd || env.isTest ? undefined : { target: 'pino-pretty' },
})
