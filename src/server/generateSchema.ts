import type { GraphQLSchema } from 'graphql'
import type {
    BuildSchemaOptions,
    NonEmptyArray,
} from 'type-graphql'
import { buildSchemaSync } from 'type-graphql'

import * as resolvers from '../resolvers'

export const generateSchema = (options?: Pick<BuildSchemaOptions, 'authChecker'>): GraphQLSchema => {
    return buildSchemaSync({
        ...options,
        resolvers: [...Object.values(resolvers)] as unknown as NonEmptyArray<string>,
        validate: false,
    })
}
