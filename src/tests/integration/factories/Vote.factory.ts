import { faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'
import {
    container,
    injectable,
} from 'tsyringe'

import { VOTE_DEFAULT_SELECT } from '../../../resolvers'
import { orm } from '../../../shared/orm'
import type { Factory } from '../types'
import { VoteTypeEnum } from '../types/generated'

import { PostFactory } from './Post.factory'

type ParamsType = {
    existing?: {
        postId: string
    }
    value?: {
        text?: string
        type?: VoteTypeEnum
        userId?: string
    }
}

@injectable()
export class VoteFactory implements Factory {
    private postFactory = container.resolve(PostFactory)

    public async createAmount(amount: number, params?: ParamsType) {
        const data: Prisma.VoteCreateInput[] = [...new Array(amount)].map(() => {
            return this.generateData(params)
        })

        return orm.$transaction(
            data.map((vote) => {
                return orm.vote.create({
                    data: vote,
                    select: VOTE_DEFAULT_SELECT(),
                })
            })
        )
    }

    public async createOne(params?: ParamsType) {
        return orm.vote.create({
            data: this.generateData(params),
            select: VOTE_DEFAULT_SELECT(),
        })
    }

    public generateData(params?: ParamsType): Prisma.VoteCreateInput {
        const { existing, value } = params ?? {}

        const post: Prisma.PostCreateOrConnectWithoutVotesInput = {
            create: this.postFactory.generateData(),
            where: {
                id: existing?.postId ?? faker.datatype.uuid(),
            },
        }

        return {
            post: {
                connectOrCreate: post,
            },
            type: value?.type ?? VoteTypeEnum.Positive,
            userId: value?.userId ?? faker.datatype.uuid(),
        }
    }
}
