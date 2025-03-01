import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as mustache from 'mustache-express'
import * as cookieParser from 'cookie-parser'
import { ConfigService } from '@nestjs/config'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER)
  app.useLogger(logger)

  app.use(cookieParser('CONFIDENTIAL'))
  app.set('views', __dirname, '/../views')
  app.set('view engine', 'html')
  app.engine('html', mustache())

  const configService = app.get(ConfigService)
  await app.listen(configService.get('PORT'))
}
bootstrap()
