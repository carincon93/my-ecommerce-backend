import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateEcommerceDto } from './dto/create-ecommerce.dto'
import { UpdateEcommerceDto } from './dto/update-ecommerce.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { promises as fs } from 'fs'
import { join } from 'path'

@Injectable()
export class EcommerceService {
    constructor(private prisma: PrismaService) {}

    async create(createEcommerceDto: CreateEcommerceDto) {
        const ecommerce = await this.findOne()

        if (Boolean(ecommerce)) {
            return
        }

        createEcommerceDto.image = ''
        createEcommerceDto.paymentMethodsImageLight = ''
        createEcommerceDto.paymentMethodsImageDark = ''
        createEcommerceDto.logoDark = ''
        createEcommerceDto.logoLight = ''
        createEcommerceDto.faviconDark = ''
        createEcommerceDto.faviconLight = ''
        createEcommerceDto.shipping = Number(createEcommerceDto.shipping)
        createEcommerceDto.freeShippingFrom = Number(createEcommerceDto.freeShippingFrom)

        return this.prisma.ecommerce.create({
            data: createEcommerceDto,
        })
    }

    findAll() {
        return this.prisma.ecommerce.findMany()
    }

    findOne() {
        return this.prisma.ecommerce.findFirst({
            include: {
                policies: true,
                categories: true,
            },
        })
    }

    async update(updateEcommerceDto: UpdateEcommerceDto) {
        const ecommerce = await this.findOne()
        if (!ecommerce) {
            throw new HttpException('Ecommerce record not found', HttpStatus.NOT_FOUND)
        }

        const updatedData: Partial<UpdateEcommerceDto> = {
            ...updateEcommerceDto,
            shipping: updateEcommerceDto.shipping ? parseFloat(updateEcommerceDto.shipping as any) : ecommerce.shipping,
            freeShippingFrom: updateEcommerceDto.freeShippingFrom ? parseFloat(updateEcommerceDto.freeShippingFrom as any) : ecommerce.freeShippingFrom,
        }

        try {
            return await this.prisma.ecommerce.update({
                where: { id: ecommerce.id },
                data: updatedData,
            })
        } catch (error) {
            throw new HttpException('Failed to update ecommerce record', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updatePaymentMethodImage(paymentsImage: Express.Multer.File, body): Promise<any> {
        const { paymentMethodsImageDark, paymentMethodsImageLight } = await this.findOne()

        const paymentsImageColor = body?.['payments-image-color'] || ''

        const paymentsImageSelected = body?.paymentsImageColor == 'dark' ? paymentMethodsImageDark : paymentMethodsImageLight

        if (paymentsImageSelected) {
            const filePath = join('./uploads/ecommerce', paymentsImageSelected)

            try {
                await fs.unlink(filePath)
            } catch (error) {
                if (error.code !== 'ENOENT') {
                    // Si el error NO es que el archivo no existe, lanzar excepción
                    throw new HttpException('Unable to delete file', HttpStatus.INTERNAL_SERVER_ERROR)
                }
                // Si el archivo no existe (ENOENT), simplemente continuar sin error
                console.warn(`File not found: ${filePath}`)
            }
        }

        return this.update({
            paymentMethodsImageDark: paymentsImageColor == 'dark' ? paymentsImage.filename : paymentMethodsImageDark,
            paymentMethodsImageLight: paymentsImageColor == 'light' ? paymentsImage.filename : paymentMethodsImageLight,
        })
    }

    async updateMainImage(imageFile: Express.Multer.File): Promise<any> {
        const { image } = await this.findOne()

        if (image) {
            const filePath = join('./uploads/ecommerce', image)

            // Usamos una promesa para manejar el unlink de manera asíncrona
            try {
                await fs.unlink(filePath)
            } catch (error) {
                if (error.code !== 'ENOENT') {
                    // Si el error NO es que el archivo no existe, lanzar excepción
                    throw new HttpException('Unable to delete file', HttpStatus.INTERNAL_SERVER_ERROR)
                }
                // Si el archivo no existe (ENOENT), simplemente continuar sin error
                console.warn(`File not found: ${filePath}`)
            }
        }

        return this.update({
            image: imageFile.filename,
        })
    }

    async updateLogo(logo: Express.Multer.File, body): Promise<any> {
        const { logoDark, logoLight } = await this.findOne()

        const logoColor = body?.logoColor

        const logoSelected = body?.logoColor == 'dark' ? logoDark : logoLight

        if (logoSelected) {
            const filePath = join('./uploads/ecommerce', logoSelected)

            try {
                await fs.unlink(filePath)
            } catch (error) {
                if (error.code !== 'ENOENT') {
                    // Si el error NO es que el archivo no existe, lanzar excepción
                    throw new HttpException('Unable to delete file', HttpStatus.INTERNAL_SERVER_ERROR)
                }
                // Si el archivo no existe (ENOENT), simplemente continuar sin error
                console.warn(`File not found: ${filePath}`)
            }
        }

        return this.update({
            logoDark: logoColor == 'dark' ? logo.filename : logoDark,
            logoLight: logoColor == 'light' ? logo.filename : logoLight,
        })
    }

    async updateFavicon(favicon: Express.Multer.File, body): Promise<any> {
        const { faviconDark, faviconLight } = await this.findOne()

        const faviconColor = body?.faviconColor

        const faviconSelected = body?.faviconColor == 'dark' ? faviconDark : faviconLight

        if (faviconSelected) {
            const filePath = join('./uploads/ecommerce', faviconSelected)

            try {
                await fs.unlink(filePath)
            } catch (error) {
                if (error.code !== 'ENOENT') {
                    // Si el error NO es que el archivo no existe, lanzar excepción
                    throw new HttpException('Unable to delete file', HttpStatus.INTERNAL_SERVER_ERROR)
                }
                // Si el archivo no existe (ENOENT), simplemente continuar sin error
                console.warn(`File not found: ${filePath}`)
            }
        }

        return this.update({
            faviconDark: faviconColor == 'dark' ? favicon.filename : faviconDark,
            faviconLight: faviconColor == 'light' ? favicon.filename : faviconLight,
        })
    }

    remove(id: string) {
        return `This action removes a #${id} webpage`
    }
}
