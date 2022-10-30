import {
    Field,
    ID,
    InputType,
} from 'type-graphql'

import { VoteTypeEnum } from '../enums'

@InputType()
export class CreateVoteInput {
    @Field(() => ID)
    public postId: string

    @Field(() => VoteTypeEnum)
    public type: VoteTypeEnum

    @Field(() => String)
    public userId: string
}
