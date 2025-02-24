import { ApiProperty } from '@nestjs/swagger'

export class CreatePolicyDto {
    @ApiProperty()
    title: string

    @ApiProperty()
    content: string

    @ApiProperty()
    ecommerceId: string
}
