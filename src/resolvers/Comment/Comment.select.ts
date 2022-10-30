import type { Prisma } from '@prisma/client'

const makeCommentSelect = <TSelect extends Prisma.CommentSelect>(
    select: Prisma.Subset<TSelect, Prisma.CommentSelect>,
): TSelect => {
    return select
}

export const COMMENT_DEFAULT_SELECT = () => {
    return makeCommentSelect({
        content: true,
        createdAt: true,
        id: true,
    })
}
