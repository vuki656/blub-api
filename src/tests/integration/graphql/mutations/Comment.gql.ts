import { gql } from 'apollo-server'

export const CREATE_COMMENT = gql`
    mutation CreateComment($input: CreateCommentInput!) {
        createComment(input: $input) {
            comment {
                id
                content
            }
        }
    }
`
