import { Injectable } from '@nestjs/common'
import { CreateProductCategoryDto } from './dto/create-product-category.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ProductCategoryService {
    constructor(private prisma: PrismaService) {}

    async create(createProductCategoryDto: CreateProductCategoryDto, productId: string) {
        createProductCategoryDto.productId = productId

        const productCategory = await this.prisma.productCategory.create({
            data: createProductCategoryDto,
        })

        const category = await this.prisma.category.findUnique({
            where: { id: createProductCategoryDto.categoryId },
        })

        return { id: productCategory.id, category: { name: category.name } }
    }

    remove(id: string) {
        return this.prisma.productCategory.delete({
            where: {
                id,
            },
            include: {
                product: true,
                category: true,
            },
        })
    }
}
