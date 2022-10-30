import {
    Field,
    ObjectType,
} from 'type-graphql'

import { BaseType } from '../../../shared/typegraphql-types'

@ObjectType({ implements: BaseType })
export class CommentType extends BaseType {
    @Field(() => String)
    public content: string

    @Field(() => Date)
    public createdAt: Date
}
