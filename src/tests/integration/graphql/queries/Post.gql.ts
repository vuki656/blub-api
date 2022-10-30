import { gql } from 'apollo-server'

import { POST_PAYLOAD } from '../fragments'

export const POSTS = gql`
    query Posts($args: PostsArgs!) {
        posts(args: $args) {
            total
            list {
                ...PostPayload
            }
        }
    }
    ${POST_PAYLOAD}
`
