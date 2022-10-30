import { v4 } from 'uuid'

import { server } from '../../../../server'

import type {
    RequestType,
    ResponseType,
} from './executeOperation.types'

export const executeOperation = async <TData, TVariables>(
    request: RequestType<TVariables>,
    params?: {
        integrationContextArgument?: any
        userId?: string
    }
): Promise<[ResponseType<TData>]> => {
    const response = await server.executeOperation(
        request as any,
        {
            ...params?.integrationContextArgument,
            req: {
                ...params?.integrationContextArgument?.req,
                headers: {
                    ...params?.integrationContextArgument?.req?.headers,
                    authorization: params?.userId ?? v4(),
                },
            },
        }
    ) as ResponseType<TData>

    return [response]
}
