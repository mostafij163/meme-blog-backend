import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { MemeController } from './meme.controller';
import { MemeService } from './meme.service';
import { Meme, memeSchema } from './schemas/meme.schema';

@Module({
    imports: [
        MulterModule.register({
            dest: "../client/public/images/memes"
        }),
        MongooseModule.forFeature([
            {
                name: Meme.name,
                schema: memeSchema
            }
        ])
    ],
    controllers: [MemeController],
    providers: [MemeService]
})
export class MemeModule {}
