import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { CustomerService } from 'src/customer/customer.service'
import { EcommerceService } from 'src/ecommerce/ecommerce.service'
import { StockService } from 'src/stock/stock.service'

@Module({
    controllers: [OrderController],
    providers: [OrderService, CustomerService, EcommerceService, StockService],
    imports: [PrismaModule],
})
export class OrderModule {}
