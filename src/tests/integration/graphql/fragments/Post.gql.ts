import { gql } from 'apollo-server'

import { COMMENT_PAYLOAD } from './Comment.gql'
import { VOTE_PAYLOAD } from './Vote.gql'

export const POST_PAYLOAD = gql`
    fragment PostPayload on PostType {
        id
        text
        createdAt
        votes {
            ...VotePayload
        }
        comments {
            ...CommentPayload
        }
    }
    ${VOTE_PAYLOAD}
    ${COMMENT_PAYLOAD}
`
