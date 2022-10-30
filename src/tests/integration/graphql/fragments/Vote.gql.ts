import { gql } from 'apollo-server'

export const VOTE_PAYLOAD = gql`
    fragment VotePayload on VoteType {
        id
        userId
        type
    }
`
