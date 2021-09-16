import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import {Document, Types} from "mongoose"

@Schema({
    timestamps: true
})
export class Meme extends Document {
    @Prop()
    path!: string

    @Prop({
        type: Types.ObjectId
    })
    user!: string
    createdAt?: string
}

export const memeSchema = SchemaFactory.createForClass(Meme)