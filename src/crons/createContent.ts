import { schedule } from 'node-cron'

import { LoggerCategoriesEnum } from '../shared/enums'
import { env } from '../shared/env'
import { openai } from '../shared/openai'
import { orm } from '../shared/orm'
import {
    getRandomArrayElement,
    logger,
} from '../shared/utils'

const INPUTS = [
    'Tell me an embarrassing story from your life.',
    'Tell me a funny story from your work.',
    'Tell me a funny story about your relationship',
    'Tell me a story where you got very mad at work.',
    'Tell me a sad story from your life.',
    'Tell me a story about you cheating on your boyfriend.',
    'Tell me a story about you cheating on your girlfriend.',
    'Tell me a funny story about how you got fired from your job.',
    'Tell me a story about how you broke up with your girlfriend.',
    'Tell me an embarrassing story from your school days.',
    'Tell me a funny story about your marriage.',
]

export const createContentCron = schedule(env.OPEN_AI_CONTENT_CRON, async () => {
    const response = await openai
        .createCompletion({
            frequency_penalty: 2,
            max_tokens: 300,
            model: 'text-davinci-002',
            prompt: getRandomArrayElement(INPUTS),
            temperature: 1,
        })
        .catch((error: unknown) => {
            logger.error({
                category: LoggerCategoriesEnum.CRONS,
                error,
                message: 'Text fetch from open AI failed',
            })
        })

    if (!response) {
        logger.error({
            category: LoggerCategoriesEnum.CRONS,
            message: 'No data from open AI fetch',
        })

        return
    }

    await orm
        .post
        .create({
            data: {
                isFake: true,
                text: response.data.choices[0]?.text ?? '',
                userId: 'f3542ef6-2d84-4c7b-9e6f-c74741834f8f',
            },
        })
        .catch((error: unknown) => {
            logger.error({
                category: LoggerCategoriesEnum.CRONS,
                error,
                message: 'Open AI text database update failed',
            })
        })
})
