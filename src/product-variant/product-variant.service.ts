import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateProductVariantDto } from './dto/create-product-variant.dto'

@Injectable()
export class ProductVariantService {
    constructor(private prisma: PrismaService) {}

    async create(createProductVariantDto: CreateProductVariantDto) {
        const variantsExist = this.prisma.productVariant.findMany({
            where: {
                variantId: createProductVariantDto.variantId,
                productId: createProductVariantDto.productId,
            },
        })

        if ((await variantsExist).length > 0) {
            return
        }

        await this.prisma.productVariant.create({
            data: createProductVariantDto,
        })

        return await this.prisma.productVariant.create({
            data: {
                productId: createProductVariantDto.variantId,
                variantId: createProductVariantDto.productId,
            },
            include: {
                mainProduct: true,
                variant: true,
            },
        })
    }

    async remove(id: string) {
        const productVariant = await this.prisma.productVariant.findUnique({
            where: {
                id,
            },
        })

        await this.prisma.productVariant.delete({
            where: {
                productId_variantId: {
                    productId: productVariant.variantId,
                    variantId: productVariant.productId,
                },
            },
        })

        return await this.prisma.productVariant.delete({
            where: {
                id,
            },
            include: {
                mainProduct: true,
                variant: true,
            },
        })
    }
}
