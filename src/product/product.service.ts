import { Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async create(createProductDto: CreateProductDto, imageFile: Express.Multer.File) {
        try {
            // Convertir precios a números
            createProductDto.price = Number(createProductDto.price)
            createProductDto.priceBeforeOff = createProductDto.priceBeforeOff ? Number(createProductDto.priceBeforeOff) : null

            // Extraer propiedades que no van directamente en la creación del producto
            const { categoriesId, productsId, image, ...restCreateProductDto } = createProductDto

            // Crear producto en la base de datos
            const product = await this.prisma.product.create({
                data: restCreateProductDto,
            })

            // Asociar imagen al producto
            await this.prisma.photo.create({
                data: {
                    image: imageFile.filename,
                    productId: product.id,
                },
            })

            // Obtener todas las fotos asociadas al producto
            const photos = await this.prisma.photo.findMany({
                where: { productId: product.id },
            })

            // Retornar producto con sus fotos
            return { ...product, photos }
        } catch (error) {
            console.error('Error creating product:', error)
            throw new Error('Failed to create product')
        }
    }

    async findAll() {
        const products = await this.prisma.product.findMany({
            include: {
                photos: true,
                stock: true,
                categories: {
                    select: {
                        id: true,
                        category: {
                            select: {
                                name: true,
                                title: true,
                            },
                        },
                    },
                },
                variants: {
                    select: {
                        id: true,
                        mainProduct: {
                            include: {
                                photos: true,
                            },
                        },
                    },
                },
            },
        })

        const order = ['S', 'M', 'L', 'XL']

        const transformedProducts = products.map((product) => ({
            ...product,
            categories: product.categories.map((productCategory) => ({ id: productCategory.id, category: { name: productCategory.category.name, title: productCategory.category.title } })),
            stock: product.stock.sort((a, b) => {
                return order.indexOf(a.size) - order.indexOf(b.size)
            }),
        }))

        return transformedProducts
    }

    findOne(id: string) {
        return this.prisma.product.findUnique({
            where: { id },
            include: {
                photos: true,
                stock: true,
            },
        })
    }

    update(id: string, updateProductDto: UpdateProductDto) {
        updateProductDto.priceBeforeOff = Number(updateProductDto.priceBeforeOff) > 0 ? Number(updateProductDto.priceBeforeOff) : null
        updateProductDto.price = Number(updateProductDto.price)

        return this.prisma.product.update({
            where: {
                id,
            },
            data: updateProductDto,
        })
    }

    async remove(id: string) {
        await this.prisma.stock.deleteMany({
            where: {
                productId: id,
            },
        })

        await this.prisma.productCategory.deleteMany({
            where: {
                productId: id,
            },
        })

        await this.prisma.productVariant.deleteMany({
            where: {
                OR: [{ productId: id }, { variantId: id }],
            },
        })

        await this.prisma.photo.deleteMany({
            where: {
                productId: id,
            },
        })

        return await this.prisma.product.delete({
            where: {
                id,
            },
        })
    }
}
