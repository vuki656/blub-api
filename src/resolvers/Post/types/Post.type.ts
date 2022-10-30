import type { VoteType as PrismaVoteType } from '@prisma/client'
import {
    Field,
    ObjectType,
} from 'type-graphql'

import { BaseType } from '../../../shared/typegraphql-types'
import { CommentType } from '../../Comment'
import { VoteType } from '../../Vote'
import { VoteTypeEnum } from '../../Vote/enums'

@ObjectType({ implements: BaseType })
export class PostType extends BaseType {
@Field(() => [CommentType], { nullable: true })
    public comments: CommentType[] | null

@Field(() => Date)
public createdAt: Date

@Field(() => String)
public text: string

@Field(() => VoteTypeEnum, { nullable: true }) // eslint-disable-next-line type-graphql/invalid-decorated-type
public userVote: PrismaVoteType | null

@Field(() => [VoteType])
public votes: VoteType[]
}
