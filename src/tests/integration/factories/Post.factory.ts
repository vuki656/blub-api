import { faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'
import { injectable } from 'tsyringe'

import { POST_DEFAULT_SELECT } from '../../../resolvers'
import { orm } from '../../../shared/orm'
import type { Factory } from '../types'

type ParamsType = {
    value?: {
        text?: string
    }
}

@injectable()
export class PostFactory implements Factory {
    public async createAmount(amount: number, params?: ParamsType) {
        const data: Prisma.PostCreateInput[] = [...new Array(amount)].map(() => {
            return this.generateData(params)
        })

        return orm.$transaction(
            data.map((post) => {
                return orm.post.create({
                    data: post,
                    select: POST_DEFAULT_SELECT(),
                })
            })
        )
    }

    public async createOne(params?: ParamsType) {
        return orm.post.create({
            data: this.generateData(params),
            select: POST_DEFAULT_SELECT(),
        })
    }

    public generateData(params?: ParamsType): Prisma.PostCreateInput {
        const { value } = params ?? {}

        return {
            text: value?.text ?? faker.lorem.paragraphs(),
        }
    }
}
