import { Controller, Get, Header, HttpCode, HttpRedirectResponse, Param, Post, Query, Redirect } from '@nestjs/common'

@Controller('/api/users')
export class UserController {
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
