import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreatePhotoDto } from './dto/create-photo.dto'
import { UpdatePhotoDto } from './dto/update-photo.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { promises as fs } from 'fs'
import { join } from 'path'

@Injectable()
export class PhotoService {
    constructor(private prisma: PrismaService) {}

    create(productId: string, createPhotoDto: CreatePhotoDto, image: Express.Multer.File) {
        createPhotoDto.productId = productId
        createPhotoDto.image = image.filename
        createPhotoDto.isSizeGuide = String(createPhotoDto.isSizeGuide) === 'true'
        createPhotoDto.productId = productId

        return this.prisma.photo.create({
            data: createPhotoDto,
        })
    }

    findAll(productId: string) {
        return this.prisma.photo.findMany({
            where: {
                productId,
            },
        })
    }

    findOne(id: string) {
        return this.prisma.photo.findUnique({
            where: { id },
        })
    }

    update(id: string, updatePhotoDto: UpdatePhotoDto) {
        return this.prisma.photo.update({
            where: {
                id,
            },
            data: updatePhotoDto,
        })
    }

    async deletePhoto(photoId: string) {
        const photo = await this.findOne(photoId)

        const filePath = join('./uploads/products', photo.image)

        try {
            await fs.unlink(filePath)
        } catch (error) {
            if (error.code !== 'ENOENT') {
                // Si el error NO es que el archivo no existe, lanzar excepción
                throw new HttpException('Unable to delete file', HttpStatus.INTERNAL_SERVER_ERROR)
            }
            // Si el archivo no existe (ENOENT), simplemente continuar sin error
            console.warn(`File not found: ${filePath}`)
        }

        return this.remove(photoId)
    }

    remove(id: string) {
        return this.prisma.photo.delete({
            where: {
                id,
            },
        })
    }
}
