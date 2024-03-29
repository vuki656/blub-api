import { container } from 'tsyringe'
import {
    Arg,
    Ctx,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql'

import { ContextType } from '../../shared/typescript-types'

import {
    PostArgs,
    PostsArgs,
} from './args'
import { CreatePostInput } from './inputs'
import { CreatePostPayload } from './payloads'
import { PostService } from './Post.service'
import {
    PostsType,
    PostType,
} from './types'

@Resolver(() => PostType)
export class PostResolver {
    private service = container.resolve(PostService)

    @Mutation(() => CreatePostPayload)
    public async createPost(
        @Ctx() context: ContextType,
        @Arg('input', () => CreatePostInput) input: CreatePostInput,
    ): Promise<CreatePostPayload> {
        return this.service.createOne(input, context)
    }

    @Query(() => PostType)
    public async post(
        @Ctx() context: ContextType,
        @Arg('args', () => PostArgs) args: PostArgs,
    ): Promise<PostType> {
        return this.service.findOne(args, context)
    }

    @Query(() => PostsType)
    public async posts(
        @Ctx() context: ContextType,
        @Arg('args', () => PostsArgs) args: PostsArgs,
    ): Promise<PostsType> {
        return this.service.findAll(args, context)
    }
}
