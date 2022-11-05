import { faker } from '@faker-js/faker'
import { container } from 'tsyringe'

import { PostFactory } from '../../factories'
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

    beforeAll(() => {
        postFactory = container.resolve(PostFactory)
    })

    beforeEach(async () => {
        await wipeDatabase()
    })

    afterAll(async () => {
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
            const LATEST_POST_ID = 'af07c939-0921-4610-a6a2-37b9296db2c5'

            await postFactory.createAmount(60)

            await postFactory.createOne({
                value: {
                    id: LATEST_POST_ID,
                    text: 'Hello',
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
