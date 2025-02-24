import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { Public } from 'src/decorators/public.decorator'

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

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
    create(@UploadedFile() image: Express.Multer.File, @Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto, image)
    }

    @Public()
    @Get()
    findAll() {
        return this.productService.findAll()
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.findOne(id)
    }

    @Patch(':id')
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
    update(@UploadedFile() image: Express.Multer.File, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(id, updateProductDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.remove(id)
    }
}
