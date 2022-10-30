import { faker } from '@faker-js/faker'
import { container } from 'tsyringe'

import { orm } from '../../../../shared/orm'
import {
    PostFactory,
    VoteFactory,
} from '../../factories'
import { CREATE_VOTE } from '../../graphql/mutations'
import type {
    CreateVoteMutation,
    CreateVoteMutationVariables,
} from '../../types/generated'
import { VoteTypeEnum } from '../../types/generated'
import {
    executeOperation,
    wipeDatabase,
} from '../../utils'

describe('Vote resolver', () => {
    let postFactory: PostFactory
    let voteFactory: VoteFactory

    beforeAll(() => {
        postFactory = container.resolve(PostFactory)
        voteFactory = container.resolve(VoteFactory)
    })

    beforeEach(async () => {
        await wipeDatabase()
    })

    afterAll(async () => {
        await wipeDatabase()
    })

    describe('when createVote mutation is called', () => {
        it('should create a vote', async () => {
            const USER_ID = faker.datatype.uuid()

            const existingPost = await postFactory.createOne()

            const [findResponse] = await executeOperation<
                CreateVoteMutation,
                CreateVoteMutationVariables
            >({
                query: CREATE_VOTE,
                variables: {
                    input: {
                        postId: existingPost.id,
                        type: VoteTypeEnum.Positive,
                        userId: USER_ID,
                    },
                },
            })

            const post = await orm.post.findFirst({
                select: {
                    votes: {
                        select: {
                            type: true,
                            userId: true,
                        },
                    },
                },
                where: {
                    id: existingPost.id,
                },
            })

            expect(findResponse.errors).toBeUndefined()

            expect(post?.votes[0]).toMatchObject({
                type: VoteTypeEnum.Positive,
                userId: USER_ID,
            })

            expect(findResponse.data?.createVote?.vote).toMatchObject({
                type: VoteTypeEnum.Positive,
                userId: USER_ID,
            })
        })

        it('should return null if user already voted on a post', async () => {
            const USER_ID = faker.datatype.uuid()

            const existingVote = await voteFactory.createOne({
                value: {
                    userId: USER_ID,
                },
            })

            const post = await orm.post.findFirstOrThrow({
                where: {
                    votes: {
                        some: {
                            id: existingVote.id,
                        },
                    },
                },
            })

            const [findResponse] = await executeOperation<
                CreateVoteMutation,
                CreateVoteMutationVariables
            >({
                query: CREATE_VOTE,
                variables: {
                    input: {
                        postId: post.id,
                        type: VoteTypeEnum.Positive,
                        userId: USER_ID,
                    },
                },
            })

            expect(findResponse.errors).toBeUndefined()
            expect(findResponse.data?.createVote).toBeNull()
        })
    })
})
