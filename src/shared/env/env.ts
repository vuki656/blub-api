import { config } from 'dotenv'
import {
    cleanEnv,
    EnvError,
    EnvMissingError,
    num,
    str,
} from 'envalid'

if (process.env.CI) {
    config({ path: '.env.example' })
} else {
    config()
}

export const env = cleanEnv(process.env, {
    APP_JWT_DURATION: num(),
    APP_JWT_SECRET: str(),
    APP_LOG_LEVEL: str(),
    APP_PORT: num(),
    DB_DOCKER_URL: str(),
    DB_PASSWORD: str(),
    DB_PRISMA_URL: str(),
    DB_USERNAME: str(),
}, {
    reporter: ({ errors }) => {
        for (const [environmentVariable, error] of Object.entries(errors)) {
            if (error instanceof EnvError) {
                throw new EnvError(`${environmentVariable} EnvError ${error}`)
            } else if (error instanceof EnvMissingError) {
                throw new EnvMissingError(`${environmentVariable} EnvMissingError ${error}`)
            } else {
                throw new TypeError(`${environmentVariable} error ${error}`)
            }
        }
    },
})
