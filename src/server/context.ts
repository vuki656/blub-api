import type { ExpressContext } from 'apollo-server-express'
import { v4 as UUID } from 'uuid'

import type { ContextType } from '../shared/typescript-types'

export const context = (expressContext: ExpressContext): ContextType => {
    return {
        ...expressContext,
        request: expressContext.req,
        requestId: UUID(),
        response: expressContext.res,
        userId: expressContext.req.headers.authorization ?? '',
    }
}
