import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as mustache from 'mustache-express'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.use(cookieParser('CONFIDENTIAL'))

  app.set('views', __dirname, '/../views')
  app.set('view engine', 'html')
  app.engine('html', mustache())

  await app.listen(3000)
}

bootstrap()
