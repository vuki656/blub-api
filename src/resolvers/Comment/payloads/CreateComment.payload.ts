import {
    Field,
    ObjectType,
} from 'type-graphql'

import { CommentType } from '../types'

@ObjectType()
export class CreateCommentPayload {
    @Field(() => CommentType)
    public comment: CommentType
}
