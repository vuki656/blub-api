import type { Prisma } from '@prisma/client'

const makePostSelect = <TSelect extends Prisma.PostSelect>(
    select: Prisma.Subset<TSelect, Prisma.PostSelect>,
): TSelect => {
    return select
}

export const POST_DEFAULT_SELECT = () => {
    return makePostSelect({
        createdAt: true,
        id: true,
        text: true,
    })
}
