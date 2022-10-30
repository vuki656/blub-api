import type { ExpressContext } from 'apollo-server-express'

export type ContextType = {
    request: ExpressContext['req']
    requestId: string
    response: ExpressContext['res']
    userId: string
}
