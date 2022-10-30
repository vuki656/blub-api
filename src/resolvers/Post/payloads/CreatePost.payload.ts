import {
    Field,
    ObjectType,
} from 'type-graphql'

import { PostType } from '../types'

@ObjectType()
export class CreatePostPayload {
    @Field(() => PostType)
    public post: PostType
}
