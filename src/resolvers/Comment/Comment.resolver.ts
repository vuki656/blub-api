import { container } from 'tsyringe'
import {
    Arg,
    Mutation,
    Resolver,
} from 'type-graphql'

import { CommentService } from './Comment.service'
import { CreateCommentInput } from './inputs'
import { CreateCommentPayload } from './payloads'
import { CommentType } from './types'

@Resolver(() => CommentType)
export class CommentResolver {
    private service = container.resolve(CommentService)

    @Mutation(() => CreateCommentPayload)
    public async createComment(
        @Arg('input', () => CreateCommentInput) input: CreateCommentInput,
    ): Promise<CreateCommentPayload> {
        return this.service.createOne(input)
    }
}
