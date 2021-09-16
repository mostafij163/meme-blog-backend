import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NewMemeDTO } from "./dtos/newMeme.dto";
import { Meme } from "./schemas/meme.schema";

@Injectable()
export class MemeService {
    constructor(@InjectModel(Meme.name) private readonly MemeModel: Model<Meme>) { }
    
    async createNewMeme(newMemeDto: NewMemeDTO) {
        try {
            return await this.MemeModel.create(newMemeDto)
        } catch (err) {
            throw new InternalServerErrorException("Post faild")
        }
    }

    async getAllMemes() {
        try {
            return await this.MemeModel.find()
        } catch (err) {
            throw new InternalServerErrorException()
        }
    }
}