import { registerEnumType } from 'type-graphql'

export enum VoteTypeEnum {
    NEGATIVE = 'NEGATIVE',
    POSITIVE = 'POSITIVE'
}

registerEnumType(VoteTypeEnum, { name: 'VoteTypeEnum' })
