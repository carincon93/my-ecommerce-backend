import { Injectable } from '@nestjs/common'
import { CreatePolicyDto } from './dto/create-policy.dto'
import { UpdatePolicyDto } from './dto/update-policy.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { EcommerceService } from 'src/ecommerce/ecommerce.service'

@Injectable()
export class PolicyService {
    constructor(
        private prisma: PrismaService,
        private readonly ecommerceService: EcommerceService,
    ) {}

    async create(createPolicyDto: CreatePolicyDto) {
        const ecommerceList = await this.ecommerceService.findAll()
        if (!ecommerceList || ecommerceList.length === 0) {
            throw new Error('No ecommerce records found')
        }

        const ecommerceId = ecommerceList[0].id
        return this.prisma.policy.create({
            data: { ...createPolicyDto, ecommerceId },
        })
    }

    findAll() {
        return this.prisma.policy.findMany()
    }

    findOne(id: string) {
        return this.prisma.policy.findUnique({
            where: { id },
        })
    }

    update(id: string, updatePolicyDto: UpdatePolicyDto) {
        return this.prisma.policy.update({
            where: {
                id,
            },
            data: updatePolicyDto,
        })
    }

    remove(id: string) {
        return this.prisma.policy.delete({
            where: {
                id,
            },
        })
    }
}
