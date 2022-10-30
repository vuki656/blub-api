import {
    Field,
    ID,
    InputType,
} from 'type-graphql'

@InputType()
export class PostArgs {
    @Field(() => ID)
    public id: string
}
