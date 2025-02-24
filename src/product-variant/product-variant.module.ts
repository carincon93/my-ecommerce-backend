import { Module } from '@nestjs/common'
import { ProductVariantService } from './product-variant.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ProductVariantController } from './product-variant.controller'

@Module({
    controllers: [ProductVariantController],
    providers: [ProductVariantService],
    imports: [PrismaModule],
})
export class ProductVariantModule {}
