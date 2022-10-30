import {
    Field,
    ObjectType,
} from 'type-graphql'

import { VoteType } from '../types'

@ObjectType()
export class CreateVotePayload {
    @Field(() => VoteType)
    public vote: VoteType
}
