import { faker } from '@faker-js/faker'
import { container } from 'tsyringe'

import { orm } from '../../../../shared/orm'
import { PostFactory } from '../../factories'
import { CREATE_COMMENT } from '../../graphql/mutations'
import type {
    CreateCommentMutation,
    CreateCommentMutationVariables,
} from '../../types/generated'
import {
    executeOperation,
    wipeDatabase,
} from '../../utils'

describe('Comment resolver', () => {
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

    describe('when createComment query is called', () => {
        it('should create a comment', async () => {
            const existingPost = await postFactory.createOne()

            const [response] = await executeOperation<
                CreateCommentMutation,
                CreateCommentMutationVariables
            >({
                query: CREATE_COMMENT,
                variables: {
                    input: {
                        content: faker.lorem.paragraph(),
                        postId: existingPost.id,
                    },
                },
            })

            const comment = await orm.comment.findUnique({
                where: {
                    id: response.data?.createComment.comment.id,
                },
            })

            expect(response.errors).toBeUndefined()
            expect(comment).toMatchObject({
                ...response.data?.createComment.comment,
            })
        })
    })
})
