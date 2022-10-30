import { server } from '../../server'
import { orm } from '../../shared/orm'
import { logger } from '../../shared/utils'

export default async function() {
    await orm.$disconnect()
    await server.stop()

    logger.removeAllListeners()
}
