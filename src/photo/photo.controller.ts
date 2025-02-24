import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common'
import { PhotoService } from './photo.service'
import { CreatePhotoDto } from './dto/create-photo.dto'
import { UpdatePhotoDto } from './dto/update-photo.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

@Controller('product/:productId/photo')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {}

    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/products',
                filename: (req, file, cb) => {
                    // Usa el nombre personalizado del middleware
                    const customName = req.body.customFileName || Date.now()
                    const extension = file.originalname.split('.').pop()
                    const filename = `${customName}.${extension}`
                    cb(null, filename)
                },
            }),
        }),
    )
    create(@Param('productId') productId: string, @UploadedFile() image: Express.Multer.File, @Body() createPhotoDto: CreatePhotoDto) {
        return this.photoService.create(productId, createPhotoDto, image)
    }

    @Get()
    findAll(@Param('productId') productId: string) {
        return this.photoService.findAll(productId)
    }

    @Get(':photoId')
    findOne(@Param('photoId') photoId: string) {
        return this.photoService.findOne(photoId)
    }

    @Patch(':photoId')
    update(@Param('photoId') photoId: string, @Body() updatePhotoDto: UpdatePhotoDto) {
        return this.photoService.update(photoId, updatePhotoDto)
    }

    @Delete(':photoId')
    async remove(@Param('photoId') photoId: string) {
        return this.photoService.deletePhoto(photoId)
    }
}
