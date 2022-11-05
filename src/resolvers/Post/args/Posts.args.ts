import {
    Field,
    InputType,
    Int,
} from 'type-graphql'

import { PostsSortEnum } from '../enums'

@InputType()
export class PostsArgs {
    @Field(() => Int, {
        description: 'Posts in between today and today minus day amount. If 30, it will be between today and 30 days ago',
        nullable: true,
    })
    public days?: number | null

    @Field(() => Int)
    public skip: number

    @Field(() => PostsSortEnum)
    public sort: PostsSortEnum
}
