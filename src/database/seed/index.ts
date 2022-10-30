/* eslint-disable no-console */

import 'reflect-metadata'
import { orm } from '../../shared/orm'

import { post } from './post'

void orm
    .$transaction([
        ...post,
    ])
    .catch((error: unknown) => {
        console.log(error)

        process.exit(1)
    })
    .finally(() => {
        void orm.$disconnect()
    })
