import { BadRequestException, Inject, Injectable, Scope } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { ALGORITHMS, JWTOptions } from "../utils/jwtOptions.interface";

@Injectable()
export class JWTService {
    private jwtSecret!: string
    constructor() {
        const token = process.env.JWT_SECRET;
        if (token) this.jwtSecret = token
        else throw new Error("JWT SECRET NOT FOUND")
    }

    signToken(payload: string | object | Buffer,
        jwtOptions: JWTOptions = {
        algorithm: ALGORITHMS.HS256,
        expiresIn: '15d',
        }): string {
        return jwt.sign(payload, this.jwtSecret, jwtOptions)
    }

    verifyToken(token: string, jwtOptions?: JWTOptions) {
        try {
            return jwt.verify(token, this.jwtSecret, jwtOptions)
        } catch (err:any) {
            throw new BadRequestException({
                statusCode: 401,
                message: err.message
            })
        }
    }
}