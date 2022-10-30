import { gql } from 'apollo-server'

import { VOTE_PAYLOAD } from '../fragments'

export const CREATE_VOTE = gql`
    mutation CreateVote($input: CreateVoteInput!) {
        createVote(input: $input) {
            vote {
                ...VotePayload
            }
        }
    }
    ${VOTE_PAYLOAD}
`
