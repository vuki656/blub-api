import { faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'
import {
    container,
    injectable,
} from 'tsyringe'

import { COMMENT_DEFAULT_SELECT } from '../../../resolvers'
import { orm } from '../../../shared/orm'
import type { Factory } from '../types'

import { PostFactory } from './Post.factory'

type ParamsType = {
    existing?: {
        postId: string
    }
    value?: {
        content?: string
    }
}

@injectable()
export class CommentFactory implements Factory {
    private postFactory = container.resolve(PostFactory)

    public async createAmount(amount: number, params?: ParamsType) {
        const data: Prisma.CommentCreateInput[] = [...new Array(amount)].map(() => {
            return this.generateData(params)
        })

        return orm.$transaction(
            data.map((comment) => {
                return orm.comment.create({
                    data: comment,
                    select: COMMENT_DEFAULT_SELECT(),
                })
            })
        )
    }

    public async createOne(params?: ParamsType) {
        return orm.comment.create({
            data: this.generateData(params),
            select: COMMENT_DEFAULT_SELECT(),
        })
    }

    public generateData(params?: ParamsType): Prisma.CommentCreateInput {
        const { existing, value } = params ?? {}

        const post: Prisma.PostCreateOrConnectWithoutVotesInput = {
            create: this.postFactory.generateData(),
            where: {
                id: existing?.postId ?? faker.datatype.uuid(),
            },
        }

        return {
            content: value?.content ?? faker.lorem.paragraphs(),
            post: {
                connectOrCreate: post,
            },
        }
    }
}
