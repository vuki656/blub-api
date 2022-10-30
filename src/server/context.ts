import type { ExpressContext } from 'apollo-server-express'
import { v4 } from 'uuid'

import type { ContextType } from '../shared/typescript-types'

export const context = (expressContext: ExpressContext): ContextType => {
    return {
        ...expressContext,
        request: expressContext.req,
        requestId: v4(),
        response: expressContext.res,
        userId: expressContext.req.headers.authorization ?? '',
    }
}
