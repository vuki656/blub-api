import {
    Field,
    Int,
    ObjectType,
} from 'type-graphql'

import { PostType } from './Post.type'

@ObjectType()
export class PostsType {
    @Field(() => [PostType])
    public list: PostType[]

    @Field(() => Int)
    public total: number
}
