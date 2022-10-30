import {
    ApolloServerPluginLandingPageDisabled,
    ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core'

import { env } from '../../shared/env'

export const ApolloPluginPage = env.isProduction
    ? ApolloServerPluginLandingPageDisabled()
    : ApolloServerPluginLandingPageLocalDefault()
