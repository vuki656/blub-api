import { LoggerCategoriesEnum } from '../shared/enums'
import { logger } from '../shared/utils'

import { createContentCron } from './createContent'

export const startCrons = () => {
    logger.info({
        category: LoggerCategoriesEnum.CRONS,
        message: 'Starting CRONS',
    })

    createContentCron.start()

    logger.info({
        category: LoggerCategoriesEnum.CRONS,
        message: 'Started CRONS',
    })
}
