import { singleton } from 'tsyringe'

import { orm } from '../../shared/orm'
import type { ContextType } from '../../shared/typescript-types'

import type { CreateVoteInput } from './inputs/CreateVote.input'
import type { CreateVotePayload } from './payloads'
import { VOTE_DEFAULT_SELECT } from './Vote.select'

@singleton()
export class VoteService {
    public async create(input: CreateVoteInput, context: ContextType): Promise<CreateVotePayload | null> {
        const existingVote = await orm.vote.findFirst({
            where: {
                post: {
                    id: input.postId,
                },
                userId: context.userId,
            },
        })

        if (existingVote) {
            return null
        }

        const createdVote = await orm.vote.create({
            data: {
                post: {
                    connect: {
                        id: input.postId,
                    },
                },
                type: input.type,
                userId: context.userId,
            },
            select: VOTE_DEFAULT_SELECT(),
        })

        return {
            vote: createdVote,
        }
    }
}
