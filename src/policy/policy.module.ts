import { Module } from '@nestjs/common'
import { PolicyService } from './policy.service'
import { PolicyController } from './policy.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { EcommerceService } from 'src/ecommerce/ecommerce.service'

@Module({
    controllers: [PolicyController],
    providers: [PolicyService, EcommerceService],
    imports: [PrismaModule],
})
export class PolicyModule {}
