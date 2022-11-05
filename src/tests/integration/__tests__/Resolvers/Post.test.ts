import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import { container } from 'tsyringe'
import { v4 } from 'uuid'

import {
    PostFactory,
    VoteFactory,
} from '../../factories'
import { CREATE_POST } from '../../graphql/mutations'
import { POSTS } from '../../graphql/queries/Post.gql'
import type {
    CreatePostMutation,
    CreatePostMutationVariables,
    PostsQuery,
    PostsQueryVariables,
} from '../../types/generated'
import { PostsSortEnum } from '../../types/generated'
import {
    executeOperation,
    wipeDatabase,
} from '../../utils'

describe('Post resolver', () => {
    let postFactory: PostFactory
    let voteFactory: VoteFactory

    beforeAll(() => {
        postFactory = container.resolve(PostFactory)
        voteFactory = container.resolve(VoteFactory)
    })

    beforeEach(async () => {
        await wipeDatabase()
    })

    describe('when posts query is called', () => {
        it('should return paginated posts', async () => {
            const existingPosts = await postFactory.createAmount(60)

            const [response] = await executeOperation<
                PostsQuery,
                PostsQueryVariables
            >({
                query: POSTS,
                variables: {
                    args: {
                        skip: 0,
                        sort: PostsSortEnum.New,
                    },
                },
            })

            expect(response.errors).toBeUndefined()
            expect(response.data?.posts.list).toHaveLength(50)
            expect(response.data?.posts.total).toBe(existingPosts.length)
        })

        it('should return properly paginated posts second page', async () => {
            const existingPosts = await postFactory.createAmount(60)

            const [response] = await executeOperation<
                PostsQuery,
                PostsQueryVariables
            >({
                query: POSTS,
                variables: {
                    args: {
                        skip: 50,
                        sort: PostsSortEnum.New,
                    },
                },
            })

            expect(response.errors).toBeUndefined()
            expect(response.data?.posts.list).toHaveLength(10)
            expect(response.data?.posts.total).toBe(existingPosts.length)
        })

        it('should return posts sorted date', async () => {
            const LATEST_POST_ID = v4()

            await postFactory.createAmount(60)

            await postFactory.createOne({
                value: {
                    id: LATEST_POST_ID,
                },
            })

            const [response] = await executeOperation<
                PostsQuery,
                PostsQueryVariables
            >({
                query: POSTS,
                variables: {
                    args: {
                        skip: 0,
                        sort: PostsSortEnum.New,
                    },
                },
            })

            expect(response.errors).toBeUndefined()
            expect(response.data?.posts.list[0]?.id).toBe(LATEST_POST_ID)
        })

        it('should return posts sorted by vote amount', async () => {
            const LATEST_POST_ID = v4()

            await postFactory.createAmount(60)

            await postFactory.createOne({
                value: {
                    id: LATEST_POST_ID,
                },
            })

            await voteFactory.createAmount(30, {
                existing: {
                    postId: LATEST_POST_ID,
                },
            })

            const [response] = await executeOperation<
                PostsQuery,
                PostsQueryVariables
            >({
                query: POSTS,
                variables: {
                    args: {
                        skip: 0,
                        sort: PostsSortEnum.Popular,
                    },
                },
            })

            expect(response.errors).toBeUndefined()
            expect(response.data?.posts.list[0]?.id).toBe(LATEST_POST_ID)
        })

        it('should return posts in between given days', async () => {
            // Post out of range
            await postFactory.createOne({
                value: {
                    createdAt: dayjs()
                        .subtract(80, 'days')
                        .toDate(),
                },
            })

            // Post in range
            await postFactory.createOne({
                value: {
                    createdAt: dayjs()
                        .subtract(20, 'days')
                        .toDate(),
                },
            })

            const [response] = await executeOperation<
                PostsQuery,
                PostsQueryVariables
            >({
                query: POSTS,
                variables: {
                    args: {
                        days: 30,
                        skip: 0,
                        sort: PostsSortEnum.New,
                    },
                },
            })

            expect(response.errors).toBeUndefined()
            expect(response.data?.posts.list).toHaveLength(1)
        })
    })

    describe('when createPost mutation is called', () => {
        it('should create a post', async () => {
            const TEXT = faker.lorem.paragraphs()

            const [response] = await executeOperation<
                CreatePostMutation,
                CreatePostMutationVariables
            >({
                query: CREATE_POST,
                variables: {
                    input: {
                        email: faker.internet.email(),
                        text: TEXT,
                    },
                },
            })

            expect(response.errors).toBeUndefined()
            expect(response.data?.createPost.post).toMatchObject({
                text: TEXT,
            })
        })
    })
})
