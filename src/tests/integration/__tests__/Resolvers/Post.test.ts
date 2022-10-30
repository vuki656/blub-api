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

            const [findResponse] = await executeOperation<
                PostsQuery,
                PostsQueryVariables
            >({
                query: POSTS,
                variables: {
                    args: {
                        skip: 0,
                    },
                },
            })

            expect(findResponse.errors).toBeUndefined()
            expect(findResponse.data?.posts.list).toHaveLength(50)
            expect(findResponse.data?.posts.total).toBe(existingPosts.length)
        })

        it('should return properly paginated posts', async () => {
            const existingPosts = await postFactory.createAmount(60)

            const [findResponse] = await executeOperation<
                PostsQuery,
                PostsQueryVariables
            >({
                query: POSTS,
                variables: {
                    args: {
                        skip: 50,
                    },
                },
            })

            expect(findResponse.errors).toBeUndefined()
            expect(findResponse.data?.posts.list).toHaveLength(10)
            expect(findResponse.data?.posts.total).toBe(existingPosts.length)
        })
    })

    describe('when createPost mutation is called', () => {
        it('should create a post', async () => {
            const TEXT = faker.lorem.paragraphs()

            const [findResponse] = await executeOperation<
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

            expect(findResponse.errors).toBeUndefined()
            expect(findResponse.data?.createPost.post).toMatchObject({
                text: TEXT,
            })
        })
    })
})
