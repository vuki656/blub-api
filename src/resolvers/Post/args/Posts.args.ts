import {
    Field,
    InputType,
    Int,
} from 'type-graphql'

@InputType()
export class PostsArgs {
    @Field(() => Int)
    public skip: number
}
