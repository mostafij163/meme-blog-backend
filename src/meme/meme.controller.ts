import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName } from "./utils/editName";
import { imageFileFilter } from "./utils/filterFiles";

@Controller("meme")
export class MemeController {

    @Post('upload-meme')
    @UseInterceptors(FileInterceptor('meme', {
        storage: diskStorage({
            destination: "../client/public/images/memes",
            filename: editFileName
        }),
        fileFilter: imageFileFilter
    }))
    async uploadMeme(@UploadedFile() file: Express.Multer.File) {
        
    }
}