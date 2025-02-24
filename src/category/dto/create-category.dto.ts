import { ApiProperty } from '@nestjs/swagger'

export class CreateCategoryDto {
    @ApiProperty()
    title: string

    @ApiProperty()
    name: string

    @ApiProperty()
    ecommerceId: string

    @ApiProperty()
    isMenuVisible: boolean
}
