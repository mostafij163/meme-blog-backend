import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { JWTService } from './services/jwt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: userSchema
            }
        ])
    ],
    controllers: [
        UserController,
    ],
    providers: [
        UserService,
        JWTService
    ],
})
export class UserModule {}
