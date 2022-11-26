import 'reflect-metadata'

import { ApolloServer } from 'apollo-server'

import { startCrons } from '../crons'
import { LoggerCategoriesEnum } from '../shared/enums'
import { env } from '../shared/env'
import { orm } from '../shared/orm'
import { logger } from '../shared/utils'

import { context } from './context'
import { generateSchema } from './generateSchema'
import {
    ApolloPluginLogger,
    ApolloPluginPage,
} from './plugins'

export const server = new ApolloServer({
    cache: 'bounded',
    context,
    introspection: env.isDev,
    plugins: [
        ApolloPluginLogger,
        ApolloPluginPage,
    ],
    schema: generateSchema(),
})

export const startServer = async () => {
    await server.listen({ port: env.APP_PORT })
        .then((serverInfo) => {
            startCrons()

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
