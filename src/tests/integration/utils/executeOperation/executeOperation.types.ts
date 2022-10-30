import type {
    GraphQLRequest,
    GraphQLResponse,
} from 'apollo-server-types'
import type { DocumentNode } from 'graphql'

/*
 *  If there are variables other than `connectionArgs` require `variables` otherwise make `variables` param optional
 */
export type VariablesType<TVariables> = Omit<TVariables, 'connectionArgs'> extends Record<string, never>
    ? { variables?: TVariables }
    : { variables: TVariables }

export type RequestType<TVariables> =
    Omit<GraphQLRequest, 'query' | 'variables'> &
    VariablesType<TVariables> &
    { query: DocumentNode | string }

export type ResponseType<DataType> = Omit<GraphQLResponse, 'data'> & {
    data?: DataType
}

export type FakeAuthType = {
    token: string
}
