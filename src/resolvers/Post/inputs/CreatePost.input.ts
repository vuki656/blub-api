import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class CreatePostInput {
    @Field(() => String, { nullable: true })
    public email?: string | null

    @Field(() => String)
    public text: string
}
