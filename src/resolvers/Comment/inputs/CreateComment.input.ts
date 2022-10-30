import {
    Field,
    ID,
    InputType,
} from 'type-graphql'

@InputType()
export class CreateCommentInput {
@Field(() => String)
    public content: string

@Field(() => ID)
public postId: string
}
