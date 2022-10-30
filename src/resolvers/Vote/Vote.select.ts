import type { Prisma } from '@prisma/client'

const makeVoteSelect = <TSelect extends Prisma.VoteSelect>(
    select: Prisma.Subset<TSelect, Prisma.VoteSelect>,
): TSelect => {
    return select
}

export const VOTE_DEFAULT_SELECT = () => {
    return makeVoteSelect({
        id: true,
        type: true,
        userId: true,
    })
}
