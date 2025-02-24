import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { EcommerceService } from 'src/ecommerce/ecommerce.service'
import { Public } from 'src/decorators/public.decorator'

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly ecommerceService: EcommerceService,
    ) {}

    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto)
    }

    @Public()
    @Get()
    findAll() {
        return this.categoryService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoryService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.update(id, updateCategoryDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoryService.remove(id)
    }
}
