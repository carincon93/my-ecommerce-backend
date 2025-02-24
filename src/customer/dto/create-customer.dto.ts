import { ApiProperty } from '@nestjs/swagger'

export class CreateCustomerDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    lastname: string

    @ApiProperty()
    email: string

    @ApiProperty()
    password?: string

    @ApiProperty()
    address: string

    @ApiProperty()
    phone: string

    @ApiProperty()
    country: string

    @ApiProperty()
    city: string

    @ApiProperty()
    state: string

    @ApiProperty()
    dniType: string

    @ApiProperty()
    dniNumber: string
}
