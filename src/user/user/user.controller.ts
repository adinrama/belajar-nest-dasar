import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpRedirectResponse,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res
} from '@nestjs/common'
import { User } from '@prisma/client'
import { Request, Response } from 'express'
import { Connection } from '../connection/connection'
import { MailService } from '../mail/mail.service'
import { UserRepository } from '../user-repository/user-repository'
import { UserService } from './user.service'

@Controller('/api/users')
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
    private mailService: MailService,
    private userRepository: UserRepository
  ) {}

  /** Start Database */
  @Post('/create-user')
  async createUser(@Body('first_name') firstName: string, @Body('last_name') lastName: string): Promise<User> {
    return this.userRepository.save(firstName, lastName)
  }
  /** End Database */

  /** Start Configuration: DB Connection Study Case */
  @Get('/create-connection')
  async createConnection(): Promise<string> {
    return this.connection.getName()
  }
  /** End Configuration: DB Connection Study Case */

  /** Start Custom Provider */
  @Get('/connection')
  async getConnection(): Promise<string> {
    this.mailService.send()
    return this.connection.getName()
  }
  /** End Custom Provider */

  /** Start Dependency Injection */
  @Get('/say-hello')
  async sayHello2(@Query('name') name: string): Promise<string> {
    return this.service.sayHello(name)
  }
  /** End Dependency Injection */

  /** Start Cookie */
  @Post('/set-cookie')
  setCookie(@Body('name') name: string, @Res() response: Response) {
    response.cookie('name', name)
    response.status(200).send('Success set cookie!')
  }

  @Get('/get-cookie')
  getCookie(@Req() request: Request, @Res() response: Response) {
    const cookie = request.cookies['name']
    response.status(200).send(cookie)
  }
  /** End Cookie */

  /** Start HTTP Response */
  @Get('/sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return {
      data: 'Hello JSON'
    }
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      url: '/api/users/sample-response',
      statusCode: 301
    }
  }
  /** End HTTP Response */

  /** Start HTTP Request */
  @Get('/hello')
  async sayHello(@Query('first_name') firstName: string, @Query('last_name') lastName: string): Promise<string> {
    return `Hello ${firstName || 'Guest'} ${lastName || ''}!`
  }

  @Get('/:id')
  getById(@Param('id') id: string): string {
    return `GET ${id}`
  }
  /** End HTTP Request */

  @Post()
  post(): string {
    return 'Using POST method'
  }

  @Get('/sample')
  get(): string {
    return 'Hello NestJS'
  }
}
