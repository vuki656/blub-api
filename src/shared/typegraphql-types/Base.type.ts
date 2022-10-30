import {
    Field,
    ID,
    InterfaceType,
} from 'type-graphql'

@InterfaceType('BaseType')
export class BaseType {
    @Field(() => ID)
    public id: string
}
