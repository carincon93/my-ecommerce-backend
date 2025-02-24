import { ApiProperty } from '@nestjs/swagger'

export class CreateStockDto {
    @ApiProperty()
    productId: string

    @ApiProperty()
    size: string

    @ApiProperty()
    quantity: number

    @ApiProperty()
    sku: string
}
