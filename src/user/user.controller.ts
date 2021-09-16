import { Body, Controller, Get, Post } from "@nestjs/common";
import { LoginDTO } from "./dtos/login.dto";
import { SignUpDTO } from "./dtos/sign-up.dto";
import { UserService } from "./services/user.service";

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post('sign-up')
    async signUp(@Body() data: SignUpDTO) {
        return await this.userService.createUser(data)
    }

    @Post('login')
    async login(@Body() data: LoginDTO) {
        return await this.userService.login(data)
    }
}