import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async create(createCategoryDto: CreateCategoryDto) {
        const ecommerceList = await this.findAll()
        if (!ecommerceList || ecommerceList.length === 0) {
            throw new Error('No ecommerce records found')
        }

        const ecommerceId = ecommerceList[0].id // Obtiene el primer ID de la lista
        createCategoryDto.ecommerceId = ecommerceId

        return this.prisma.category.create({
            data: createCategoryDto,
        })
    }

    findAll() {
        return this.prisma.category.findMany()
    }

    findOne(id: string) {
        return this.prisma.category.findUnique({
            where: { id },
        })
    }

    update(id: string, updateCategoryDto: UpdateCategoryDto) {
        return this.prisma.category.update({
            where: {
                id,
            },
            data: updateCategoryDto,
        })
    }

    remove(id: string) {
        return this.prisma.category.delete({
            where: {
                id,
            },
        })
    }
}
