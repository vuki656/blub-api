import { VoteType as PrismaVoteType } from '@prisma/client'
import {
    Field,
    ObjectType,
} from 'type-graphql'

import { BaseType } from '../../../shared/typegraphql-types'
import { VoteTypeEnum } from '../enums'

@ObjectType({ implements: BaseType })
export class VoteType extends BaseType {
    @Field(() => VoteTypeEnum) // eslint-disable-next-line type-graphql/invalid-decorated-type
    public type: PrismaVoteType

    @Field(() => String)
    public userId: string
}
