import { ApiProperty } from '@nestjs/swagger'

export class CreateProductCategoryDto {
    @ApiProperty()
    productId: string

    @ApiProperty()
    categoryId: string
}
