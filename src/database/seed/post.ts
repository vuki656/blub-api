import { faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { v4 } from 'uuid'

import { orm } from '../../shared/orm'

const POST_AMOUNT = 130
const PAST_POST_DATE_THRESHOLD = 90

const remove = orm.post.deleteMany()

const posts: Prisma.PostCreateInput[] = [...new Array(POST_AMOUNT)].map(() => {
    return {
        createdAt: faker.date.between(
            dayjs()
                .subtract(PAST_POST_DATE_THRESHOLD, 'days')
                .toDate(),
            dayjs().toDate()
        ),
        text: faker.lorem.sentences(),
        userId: v4(),
    }
})

const create = orm.post.createMany({
    data: [
        ...posts,
        {
            id: '8206bc5d-3556-4faa-9a65-e608612092b7',
            text: faker.lorem.sentences(),
            userId: v4(),
        },
    ],
})

export const post = [remove, create]
