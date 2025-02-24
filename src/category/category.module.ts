import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { EcommerceService } from 'src/ecommerce/ecommerce.service'

@Module({
    controllers: [CategoryController],
    providers: [CategoryService, EcommerceService],
    imports: [PrismaModule],
})
export class CategoryModule {}
