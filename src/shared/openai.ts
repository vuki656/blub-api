import {
    Configuration,
    OpenAIApi,
} from 'openai'

import { env } from './env'

const configuration = new Configuration({
    apiKey: env.OPEN_AI_SECRET,
    organization: env.OPEN_AI_ORGANIZATION,
})

export const openai = new OpenAIApi(configuration)
