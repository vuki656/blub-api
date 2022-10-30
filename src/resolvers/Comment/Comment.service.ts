import { singleton } from 'tsyringe'

import { orm } from '../../shared/orm'

import { COMMENT_DEFAULT_SELECT } from './Comment.select'
import type { CreateCommentInput } from './inputs'
import type { CreateCommentPayload } from './payloads'

@singleton()
export class CommentService {
    public async createOne(input: CreateCommentInput): Promise<CreateCommentPayload> {
        const comment = await orm.comment.create({
            data: {
                content: input.content,
                post: {
                    connect: {
                        id: input.postId,
                    },
                },
            },
            select: COMMENT_DEFAULT_SELECT(),
        })

        return {
            comment,
        }
    }
}
