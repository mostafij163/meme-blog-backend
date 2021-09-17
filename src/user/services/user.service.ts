/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDTO } from '../dtos/login.dto';
import { SignUpDTO } from '../dtos/sign-up.dto';
import { User } from '../user.schema';
import { JWTService } from './jwt.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    private readonly jwtService: JWTService,
  ) {}

  async createUser(data: SignUpDTO) {
    if (data.password !== data.confirmPassword)
      throw new UnprocessableEntityException('Password did not matched');
    try {
      const user = await this.UserModel.create({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      return this.jwtService.signToken(
        { email: user.email },
        { subject: `${user['_id']}` },
      );
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  async findUserById(id: string) {
    return await this.UserModel.findById(id);
  }

    async login(data: LoginDTO) {
    try {
      const user = await this.UserModel.findOne({ email: data.email }).select(
        '+password',
        );
      if (!user) throw new BadRequestException('User Not Found');
      if (bcrypt.compare(user.password, data.password)) {
        return this.jwtService.signToken(
          { email: user.email },
          { subject: user['_id'].toString() },
        );
      } else throw new BadRequestException('password did not matched');
    } catch (err) {
        console.log(err)
      throw new InternalServerErrorException();
    }
  }
}
