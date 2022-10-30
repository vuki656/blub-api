import { singleton } from 'tsyringe'

import { orm } from '../../shared/orm'
import type { ContextType } from '../../shared/typescript-types'

import { COMMENT_DEFAULT_SELECT } from './Comment.select'
import type { CreateCommentInput } from './inputs'
import type { CreateCommentPayload } from './payloads'

@singleton()
export class CommentService {
    public async createOne(input: CreateCommentInput, context: ContextType): Promise<CreateCommentPayload> {
        const comment = await orm.comment.create({
            data: {
                content: input.content,
                post: {
                    connect: {
                        id: input.postId,
                    },
                },
                userId: context.userId,
            },
            select: COMMENT_DEFAULT_SELECT(),
        })

        return {
            comment,
        }
    }
}
