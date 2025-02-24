import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, HttpStatus, HttpException, UseInterceptors } from '@nestjs/common'
import { EcommerceService } from './ecommerce.service'
import { CreateEcommerceDto } from './dto/create-ecommerce.dto'
import { UpdateEcommerceDto } from './dto/update-ecommerce.dto'
import { diskStorage } from 'multer'
import { FileInterceptor } from '@nestjs/platform-express'
import { Public } from 'src/decorators/public.decorator'

@Controller('ecommerce')
export class EcommerceController {
    constructor(private readonly ecommerceService: EcommerceService) {}

    @Post()
    async create(@Body() createEcommerceDto: CreateEcommerceDto) {
        return this.ecommerceService.create(createEcommerceDto)
    }

    @Get()
    findAll() {
        return this.ecommerceService.findAll()
    }

    @Public()
    @Get('my-ecommerce')
    findOne() {
        return this.ecommerceService.findOne()
    }

    @Patch('my-ecommerce')
    async update(@Body() updateEcommerceDto: UpdateEcommerceDto) {
        return this.ecommerceService.update(updateEcommerceDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ecommerceService.remove(id)
    }

    @Post('upload-image')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/ecommerce',
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
    async uploadImage(@UploadedFile() imageFile: Express.Multer.File, @Body() updateEcommerceDto: UpdateEcommerceDto) {
        await this.ecommerceService.updateMainImage(imageFile)

        return { message: 'Payment methods image updated successfully' }
    }

    @Post('upload-logo')
    @UseInterceptors(
        FileInterceptor('logo', {
            storage: diskStorage({
                destination: './uploads/ecommerce',
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
    async uploadLogo(@UploadedFile() logo: Express.Multer.File, @Body() body) {
        await this.ecommerceService.updateLogo(logo, body)

        return { message: 'Logo image updated successfully' }
    }

    @Post('upload-favicon')
    @UseInterceptors(
        FileInterceptor('favicon', {
            storage: diskStorage({
                destination: './uploads/ecommerce',
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
    async uploadFavicon(@UploadedFile() favicon: Express.Multer.File, @Body() body) {
        await this.ecommerceService.updateFavicon(favicon, body)

        return { message: 'Favicon updated successfully' }
    }

    @Post('upload-payments-image')
    @UseInterceptors(
        FileInterceptor('payments-image', {
            storage: diskStorage({
                destination: './uploads/ecommerce',
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
    async uploadPaymentsImage(@UploadedFile() paymentsImage: Express.Multer.File, @Body() body) {
        await this.ecommerceService.updatePaymentMethodImage(paymentsImage, body)

        return { message: 'Payment methods image updated successfully' }
    }
}
