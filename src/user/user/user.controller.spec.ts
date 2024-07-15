import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserService } from './user.service'

describe('UserController', () => {
  let controller: UserController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
    }).compile()

    controller = module.get<UserController>(UserController)
  })

  it('should can say hello', async () => {
    const response = await controller.sayHello('Bayu', 'Raharja')
    expect(response).toBe('Hello Bayu Raharja!')
  })

  it('should can redirect response', () => {
    const response = controller.redirect()
    expect(response.statusCode).toBe(301)
    expect(response.url).toBe('/api/users/sample-response')
  })

  it('should be able to say hello', async () => {
    const response = await controller.sayHello2('Rama')
    expect(response).toBe('Hello Rama!')
  })
})
