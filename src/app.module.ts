import { MiddlewareConsumer, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CustomerModule } from './customer/customer.module'
import { OrderModule } from './order/order.module'
import { ProductModule } from './product/product.module'
import { CategoryModule } from './category/category.module'
import { PhotoModule } from './photo/photo.module'
import { StockModule } from './stock/stock.module'
import { PrismaModule } from './prisma/prisma.module'
import { FileUploadModule } from './file-upload/file-upload.module'
import { ProductCategoryModule } from './product-category/product-category.module'
import { ProductVariantModule } from './product-variant/product-variant.module'
import { EcommerceModule } from './ecommerce/ecommerce.module'
import { PolicyModule } from './policy/policy.module'
import { OrderItemModule } from './order-item/order-item.module'
import { ClerkClientProvider } from './providers/clerk-client.provider'
import { AuthModule } from './auth/auth.module'
import { ClerkAuthGuard } from './auth/clerk-auth.guard'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { join } from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'

@Module({
    imports: [
        CustomerModule,
        OrderModule,
        ProductModule,
        CategoryModule,
        PhotoModule,
        ProductCategoryModule,
        ProductVariantModule,
        PrismaModule,
        StockModule,
        FileUploadModule,
        EcommerceModule,
        PolicyModule,
        OrderItemModule,
        ConfigModule.forRoot(),
        AuthModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads'), // Directorio donde están los SVG
            serveRoot: '/uploads', // URL accesible en el navegador
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        ClerkClientProvider,
        {
            provide: APP_GUARD,
            useClass: ClerkAuthGuard,
        },
    ],
})
export class AppModule {}
