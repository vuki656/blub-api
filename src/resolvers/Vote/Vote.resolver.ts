import { container } from 'tsyringe'
import {
    Arg,
    Mutation,
    Resolver,
} from 'type-graphql'

import { CreateVoteInput } from './inputs'
import { CreateVotePayload } from './payloads'
import { VoteType } from './types'
import { VoteService } from './Vote.service'

@Resolver(() => VoteType)
export class VoteResolver {
    private service = container.resolve(VoteService)

    @Mutation(() => CreateVotePayload, { nullable: true })
    public async createVote(
        @Arg('input', () => CreateVoteInput) input: CreateVoteInput,
    ): Promise<CreateVotePayload | null> {
        return this.service.create(input)
    }
}
