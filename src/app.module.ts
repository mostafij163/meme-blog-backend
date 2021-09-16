import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemeModule } from './meme/meme.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MemeModule, UserModule, MongooseModule.forRoot("mongodb://127.0.0.1:27017/meme")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
