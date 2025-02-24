import { Module } from '@nestjs/common'
import { EcommerceService } from './ecommerce.service'
import { EcommerceController } from './ecommerce.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
    controllers: [EcommerceController],
    providers: [EcommerceService],
    imports: [PrismaModule],
})
export class EcommerceModule {}
