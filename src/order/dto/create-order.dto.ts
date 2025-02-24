import { ApiProperty } from '@nestjs/swagger'

export class CreateOrderDto {
    @ApiProperty()
    customerId: string

    @ApiProperty()
    ecommerceId: string

    @ApiProperty()
    status: string

    @ApiProperty()
    cart: string

    @ApiProperty()
    totalCart: number

    @ApiProperty()
    totalWithShipping: number

    @ApiProperty()
    trackingNumber?: string

    @ApiProperty()
    trackingUrl?: string

    @ApiProperty()
    trackingCompany?: string
}
