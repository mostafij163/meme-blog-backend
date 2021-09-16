import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from "bcryptjs"

@Schema()
export class User extends Document {
    @Prop({
        required: true
    })
    email!: string

    @Prop({
        required: true
    })
    name!: string

    @Prop({
        required: true,
        select: false
    })
    password!: string
}

export const userSchema = SchemaFactory.createForClass(User)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword
    next();
})