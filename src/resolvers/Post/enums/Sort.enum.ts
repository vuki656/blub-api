import { registerEnumType } from 'type-graphql'

export enum PostsSortEnum {
    NEW = 'NEW',
    POPULAR = 'POPULAR'
}

registerEnumType(PostsSortEnum, { name: 'PostsSortEnum' })
