import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ProductVariantService } from './product-variant.service'
import { CreateProductVariantDto } from './dto/create-product-variant.dto'

@Controller('product/:productId/product-variant')
export class ProductVariantController {
    constructor(private readonly productVariantService: ProductVariantService) {}

    @Post()
    create(@Param('productId') productId: string, @Body() createProductVariantDto: CreateProductVariantDto) {
        return this.productVariantService.create(createProductVariantDto)
    }

    @Delete(':productVariantId')
    remove(@Param('productVariantId') productVariantId: string) {
        return this.productVariantService.remove(productVariantId)
    }
}
