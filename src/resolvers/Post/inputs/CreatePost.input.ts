import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class CreatePostInput {
    @Field(() => String, { nullable: true })
    public contestId?: string | null

    @Field(() => String)
    public text: string
}
