import { PrismaClient } from '@prisma/client'

import { LoggerCategoriesEnum } from '../enums'
import { logger } from '../utils'

export const orm = new PrismaClient({
    errorFormat: 'colorless',
    log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
    ],
})

orm.$on('query', (event) => {
    logger.trace({
        ...event,
        type: 'DATABASE',
    })
})

orm.$on('info', (event) => {
    logger.trace({
        ...event,
        category: LoggerCategoriesEnum.DATABASE,
    })
})

orm.$on('warn', (event) => {
    logger.trace({
        ...event,
        category: LoggerCategoriesEnum.DATABASE,
    })
})

orm.$on('error', (event) => {
    logger.trace({
        ...event,
        category: LoggerCategoriesEnum.DATABASE,
    })
})
