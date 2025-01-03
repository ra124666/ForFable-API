/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  API_URL: Env.schema.string(),
  VIEW_URL: Env.schema.string(),
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  DRIVE_DISK: Env.schema.enum(['local'] as const),
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  BASE_ROUTE_PREFIX: Env.schema.string(),
  REDIS_CONNECTION: Env.schema.enum(['local'] as const),
  REDIS_HOST: Env.schema.string({ format: 'host' }),
  REDIS_PORT: Env.schema.number(),
  REDIS_PASSWORD: Env.schema.string.optional(),
  USER_ROOT_NAME: Env.schema.string(),
  USER_ROOT_EMAIL: Env.schema.string(),
  USER_ROOT_PASSWORD: Env.schema.string(),
  USER_TEST_NAME: Env.schema.string(),
  USER_TEST_EMAIL: Env.schema.string(),
  USER_TEST_PASSWORD: Env.schema.string(),
  DATA_BANK_NAME: Env.schema.string(),
  TO_IGNORE_USER_ID: Env.schema.number(),
  I18N: Env.schema.string(),
  REFRESH_MINUTES_FOR_DAILY_PROMPTS: Env.schema.number(),
  SMTP_HOST: Env.schema.string({ format: 'host' }),
  SMTP_PORT: Env.schema.number(),
  SMTP_USERNAME: Env.schema.string(),
  SMTP_PASSWORD: Env.schema.string(),
  DEFAULT_CONST___POSITIVE_STRENGTH: Env.schema.number(),
  DEFAULT_CONST___NEGATIVE_STRENGTH: Env.schema.number(),
  DEFAULT_CONST___DELETE_STRENGTH: Env.schema.number(),
  DEFAULT_CONST___COMPLETION_PERCEN: Env.schema.number(),
  DEFAULT_CONST___EXCLUSION_PERCEN: Env.schema.number(),
  DEFAULT_CONST___BAN_LIMIT: Env.schema.number(),
  NEED_TO_VERIFY_EMAIL: Env.schema.boolean(),
  SESSION_DRIVER: Env.schema.string(),
  IMAGE_HOSTER_URL: Env.schema.string(),
  MB_MAX_ALLOWED_IMAGE_SIZE: Env.schema.number(),
})
