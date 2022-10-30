import { faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'
import dayjs from 'dayjs'

import { orm } from '../../shared/orm'

const remove = orm.post.deleteMany()

const posts: Prisma.PostCreateInput[] = [...new Array(130)].map(() => {
    return {
        createdAt: faker.date.between(
            dayjs()
                .subtract(90, 'days')
                .toDate(),
            dayjs().toDate()
        ),
        text: faker.lorem.sentences(),
    }
})

const create = orm.post.createMany({
    data: [
        ...posts,
        {
            id: '8206bc5d-3556-4faa-9a65-e608612092b7',
            text: faker.lorem.sentences(),
        },
    ],
})

export const post = [remove, create]
