import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma/prisma.service'

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {
    console.log('Create user repository')
  }

  async save(firstName: string, lastname?: string): Promise<User> {
    return this.prismaService.user.create({
      data: {
        first_name: firstName,
        last_name: lastname
      }
    })
  }
}
