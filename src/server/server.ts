import 'reflect-metadata'

import { ApolloServer } from 'apollo-server'

import { LoggerCategoriesEnum } from '../shared/enums'
import { env } from '../shared/env'
import { orm } from '../shared/orm'
import { logger } from '../shared/utils'

import { context } from './context'
import { generateSchema } from './generateSchema'
import { ApolloPluginLogger } from './plugins'

export const server = new ApolloServer({
    cache: 'bounded',
    context,
    introspection: env.isDev,
    plugins: [ApolloPluginLogger],
    schema: generateSchema(),
})

export const startServer = async () => {
    await server.listen({ port: env.APP_PORT })
        .then((serverInfo) => {
            logger.info({
                category: LoggerCategoriesEnum.SERVER,
                message: `🚀 Server ready at ${serverInfo.url}`,
            })
        })
        .catch((error: unknown) => {
            logger.error({
                category: LoggerCategoriesEnum.SERVER,
                error,
            })
        })
        .finally(() => {
            void orm.$disconnect()
        })
}
