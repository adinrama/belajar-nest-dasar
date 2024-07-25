import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { ProductModule } from './product/product.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
