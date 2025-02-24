import { Module } from '@nestjs/common'
import { ProductCategoryService } from './product-category.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ProductCategoryController } from './product-category.controller';

@Module({
    providers: [ProductCategoryService],
    imports: [PrismaModule],
    controllers: [ProductCategoryController],
})
export class ProductCategoryModule {}
