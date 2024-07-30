import { Module } from '@nestjs/common'
import { UserController } from './user/user.controller'
import { UserService } from './user/user.service'
import { Connection, createConnection, MongoDBConnection, MySQLConnection } from './connection/connection'
import { mailService, MailService } from './mail/mail.service'
import { UserRepository } from './user-repository/user-repository'
import { ConfigService } from '@nestjs/config'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    {
      provide: Connection,
      useClass: process.env.DATABASE == 'mysql' ? MySQLConnection : MongoDBConnection
    },
    {
      provide: MailService,
      useValue: mailService
    },
    {
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService]
    }
  ]
})
export class UserModule {}
