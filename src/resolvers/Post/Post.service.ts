import dayjs from 'dayjs'
import { singleton } from 'tsyringe'

import { orm } from '../../shared/orm'
import type { ContextType } from '../../shared/typescript-types'

import type {
    PostArgs,
    PostsArgs,
} from './args'
import { PostsSortEnum } from './enums'
import type { CreatePostInput } from './inputs'
import type { CreatePostPayload } from './payloads'
import { POST_DEFAULT_SELECT } from './Post.select'
import type {
    PostsType,
    PostType,
} from './types'

@singleton()
export class PostService {
    public async createOne(input: CreatePostInput, context: ContextType): Promise<CreatePostPayload> {
        const createdPost = await orm.post.create({
            data: {
                email: input.email,
                text: input.text,
                userId: context.userId,
            },
            select: {
                comments: true,
                votes: true,
                ...POST_DEFAULT_SELECT(),
            },
        })

        return {
            post: {
                ...createdPost,
                userVote: null,
            },
        }
    }

    public async findAll(args: PostsArgs, context: ContextType): Promise<PostsType> {
        const posts = await orm.post.findMany({
            include: {
                comments: true,
                votes: true,
            },
            orderBy: args.sort === PostsSortEnum.NEW ? {
                createdAt: 'desc',
            } : {
                votes: {
                    _count: 'desc',
                },
            },
            skip: args.skip,
            take: 20,
            where: {
                AND: [
                    {
                        isDeleted: false,
                    },
                    {
                        createdAt: args.days ? {
                            gte: dayjs()
                                .subtract(args.days, 'days')
                                .toDate(),
                            lte: dayjs().toDate(),
                        } : undefined,
                    },
                ],
            },
        })

        const total = await orm.post.count({
            where: {
                isDeleted: false,
            },
        })

        const list: PostType[] = posts.map((post) => {
            const userVote = post.votes.find((vote) => {
                return vote.userId === context.userId
            })?.type ?? null

            return {
                ...post,
                userVote,
            }
        })

        return {
            list,
            total,
        }
    }

    public async findOne(args: PostArgs, context: ContextType): Promise<PostType> {
        const post = await orm.post.findUniqueOrThrow({
            include: {
                comments: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                votes: true,
            },
            where: {
                id: args.id,
            },
        })

        const userVote = await orm.vote.findUnique({
            where: {
                userId_postFk: {
                    postFk: post.id,
                    userId: context.userId,
                },
            },
        })

        return {
            ...post,
            userVote: userVote?.type ?? null,
        }
    }
}
