import {
    Field,
    InputType,
    Int,
} from 'type-graphql'

import { PostsSortEnum } from '../enums'

@InputType()
export class PostsArgs {
    @Field(() => Int)
    public skip: number

    @Field(() => PostsSortEnum)
    public sort: PostsSortEnum
}
