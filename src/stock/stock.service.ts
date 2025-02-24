import { Injectable } from '@nestjs/common'
import { CreateStockDto } from './dto/create-stock.dto'
import { UpdateStockDto } from './dto/update-stock.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class StockService {
    constructor(private prisma: PrismaService) {}

    async create(productId: string, createStockDto: CreateStockDto) {
        const { slug } = await this.prisma.product.findUnique({
            where: {
                id: productId,
            },
        })

        createStockDto.quantity = Number(createStockDto.quantity)
        createStockDto.sku = createStockDto.size + slug
        createStockDto.productId = productId

        return this.prisma.stock.create({
            data: createStockDto,
        })
    }

    findAll(productId: string) {
        return this.prisma.stock.findMany({
            where: {
                productId,
            },
        })
    }

    findOne(id: string) {
        return this.prisma.stock.findUnique({
            where: { id },
        })
    }

    update(id: string, updateStockDto: UpdateStockDto) {
        updateStockDto.quantity = Number(updateStockDto.quantity)

        return this.prisma.stock.update({
            where: {
                id,
            },
            data: updateStockDto,
        })
    }

    remove(id: string) {
        return this.prisma.stock.delete({
            where: {
                id,
            },
        })
    }
}
