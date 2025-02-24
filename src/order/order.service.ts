import { Injectable } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { CartItem } from 'src/types/types'
import { EcommerceService } from 'src/ecommerce/ecommerce.service'
import { CustomerService } from 'src/customer/customer.service'
import { StockService } from 'src/stock/stock.service'
import * as CryptoJS from 'crypto-js'

@Injectable()
export class OrderService {
    constructor(
        private prisma: PrismaService,
        private ecommerceService: EcommerceService,
        private customerService: CustomerService,
        private stockService: StockService,
    ) {}

    private decryptData = async (encryptedData: string): Promise<CartItem[]> => {
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.SECRET_KEY)
            const decryptedString = bytes.toString(CryptoJS.enc.Utf8)
            if (!decryptedString) throw new Error('Decryption failed')

            return JSON.parse(decryptedString)
        } catch (error) {
            console.error('Error decrypting data:', error)
            return []
        }
    }

    create(createOrderDto: CreateOrderDto) {
        console.log('createOrderDto', createOrderDto)

        return this.prisma.order.create({
            data: createOrderDto,
        })
    }

    async processOrder(body) {
        // 1. Desencriptar carrito
        const cartItems = await this.decryptData(body?.cart)

        // 2. Buscar o crear el cliente
        const customer = await this.customerService.findOrCreate(body?.customer)
        if (!customer) throw new Error('Customer not found')

        // 3. Obtener datos de eCommerce
        const ecommerceData = await this.ecommerceService.findOne()

        // 4. Calcular totales
        const totalCart = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        const totalWithShipping = totalCart >= ecommerceData.freeShippingFrom ? totalCart : totalCart + ecommerceData.shipping

        // 5. Crear orden
        const order = await this.create({
            customerId: customer.id,
            cart: body?.cart,
            totalCart,
            totalWithShipping,
            status: 'PENDING',
            ecommerceId: ecommerceData.id,
        })

        // 6. Actualizar stock en paralelo
        await Promise.all(
            cartItems.map(async (cartItem) => {
                if (cartItem.stock && cartItem.stock.quantity !== undefined) {
                    await this.stockService.update(cartItem.stock.id, {
                        quantity: Math.max(0, cartItem.stock.quantity - cartItem.quantity), // Evita valores negativos
                    })
                }
            }),
        )

        return order
    }

    findAll() {
        return this.prisma.order.findMany({
            include: {
                customer: true,
                ecommerce: true,
                items: true,
            },
        })
    }

    findOne(id: string) {
        return this.prisma.order.findUnique({
            where: { id },
        })
    }

    update(id: string, updateOrderDto: UpdateOrderDto) {
        return this.prisma.order.update({
            where: {
                id,
            },
            data: updateOrderDto,
        })
    }

    async remove(id: string) {
        await this.prisma.orderItem.deleteMany({
            where: {
                orderId: id,
            },
        })

        return await this.prisma.order.delete({
            where: { id },
        })
    }
}
