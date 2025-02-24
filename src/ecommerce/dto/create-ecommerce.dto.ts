import { ApiProperty } from '@nestjs/swagger'

export class CreateEcommerceDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    email: string

    @ApiProperty()
    image: string

    @ApiProperty()
    paymentMethodsImageLight: string

    @ApiProperty()
    paymentMethodsImageDark: string

    @ApiProperty()
    logoDark: string

    @ApiProperty()
    logoLight: string

    @ApiProperty()
    faviconDark: string

    @ApiProperty()
    faviconLight: string

    @ApiProperty()
    instagram?: string

    @ApiProperty()
    tiktok?: string

    @ApiProperty()
    facebook?: string

    @ApiProperty()
    whatsapp: string

    @ApiProperty()
    address: string

    @ApiProperty()
    googleMapsUrl?: string

    @ApiProperty()
    shipping: number

    @ApiProperty()
    freeShippingFrom: number
}
