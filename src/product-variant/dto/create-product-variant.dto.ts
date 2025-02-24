import { ApiProperty } from '@nestjs/swagger'

export class CreateProductVariantDto {
    @ApiProperty()
    productId: string

    @ApiProperty()
    variantId: string
}
