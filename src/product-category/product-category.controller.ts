import { Body, Controller, Delete, Param, Post } from '@nestjs/common'
import { ProductCategoryService } from './product-category.service'
import { CreateProductCategoryDto } from './dto/create-product-category.dto'

@Controller('product/:productId/product-category')
export class ProductCategoryController {
    constructor(private readonly productCategoryService: ProductCategoryService) {}

    @Post()
    create(@Param('productId') productId: string, @Body() createProductCategoryDto: CreateProductCategoryDto) {
        return this.productCategoryService.create(createProductCategoryDto, productId)
    }

    @Delete(':productCategoryId')
    remove(@Param('productCategoryId') productCategoryId: string) {
        return this.productCategoryService.remove(productCategoryId)
    }
}
