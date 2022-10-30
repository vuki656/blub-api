import { singleton } from 'tsyringe'

import { orm } from '../../shared/orm'

import type {
    PostArgs,
    PostsArgs,
} from './args'
import type { CreatePostInput } from './inputs'
import type { CreatePostPayload } from './payloads'
import { POST_DEFAULT_SELECT } from './Post.select'
import type {
    PostsType,
    PostType,
} from './types'

@singleton()
export class PostService {
    public async createOne(input: CreatePostInput, userId: string): Promise<CreatePostPayload> {
        const createdPost = await orm.post.create({
            data: {
                email: input.email,
                text: input.text,
            },
            select: {
                comments: true,
                votes: true,
                ...POST_DEFAULT_SELECT(),
            },
        })

        const userVote = await orm.vote.findUnique({
            where: {
                userId_postFk: {
                    postFk: createdPost.id,
                    userId,
                },
            },
        })

        return {
            post: {
                ...createdPost,
                userVote: userVote?.type ?? null,
            },
        }
    }

    public async findAll(args: PostsArgs, userId: string): Promise<PostsType> {
        const posts = await orm.post.findMany({
            include: {
                comments: true,
                votes: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
            skip: args.skip,
            take: 50,
            where: {
                isDeleted: false,
            },
        })

        const total = await orm.post.count({
            where: {
                isDeleted: false,
            },
        })

        const list: PostType[] = posts.map((post) => {
            const userVote = post.votes.find((vote) => {
                return vote.userId === userId
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

    public async findOne(args: PostArgs, userId: string): Promise<PostType> {
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
                    userId,
                },
            },
        })

        return {
            ...post,
            userVote: userVote?.type ?? null,
        }
    }
}
