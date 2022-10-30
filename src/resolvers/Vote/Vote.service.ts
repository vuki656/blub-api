import { singleton } from 'tsyringe'

import { orm } from '../../shared/orm'

import type { CreateVoteInput } from './inputs/CreateVote.input'
import type { CreateVotePayload } from './payloads'
import { VOTE_DEFAULT_SELECT } from './Vote.select'

@singleton()
export class VoteService {
    public async create(input: CreateVoteInput): Promise<CreateVotePayload | null> {
        const existingVote = await orm.vote.findFirst({
            where: {
                post: {
                    id: input.postId,
                },
                userId: input.userId,
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
                userId: input.userId,
            },
            select: VOTE_DEFAULT_SELECT(),
        })

        return {
            vote: createdVote,
        }
    }
}
