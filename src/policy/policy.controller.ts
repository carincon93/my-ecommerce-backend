import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { PolicyService } from './policy.service'
import { CreatePolicyDto } from './dto/create-policy.dto'
import { UpdatePolicyDto } from './dto/update-policy.dto'
import { EcommerceService } from 'src/ecommerce/ecommerce.service'
import { Public } from 'src/decorators/public.decorator'

@Controller('policy')
export class PolicyController {
    constructor(private readonly policyService: PolicyService) {}

    @Post()
    async create(@Body() createPolicyDto: CreatePolicyDto) {
        return this.policyService.create(createPolicyDto)
    }

    @Public()
    @Get()
    findAll() {
        return this.policyService.findAll()
    }

    @Get(':policyId')
    findOne(@Param('policyId') policyId: string) {
        return this.policyService.findOne(policyId)
    }

    @Patch(':policyId')
    update(@Param('policyId') policyId: string, @Body() updatePolicyDto: UpdatePolicyDto) {
        return this.policyService.update(policyId, updatePolicyDto)
    }

    @Delete(':policyId')
    remove(@Param('policyId') policyId: string) {
        return this.policyService.remove(policyId)
    }
}
