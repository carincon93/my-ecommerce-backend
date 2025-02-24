import { ApiProperty } from '@nestjs/swagger'

export class CreateOrderItemDto {
    @ApiProperty()
    orderId: string
  
    @ApiProperty()
    sku: string


    @ApiProperty()
    status: string
}
