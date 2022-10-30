import { gql } from 'apollo-server'

export const COMMENT_PAYLOAD = gql`
    fragment CommentPayload on CommentType {
        id
        content
        createdAt
    }
`
