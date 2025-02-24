import { ApiProperty } from '@nestjs/swagger'

export class CreateProductDto {
    @ApiProperty()
    label: string

    @ApiProperty()
    name: string

    @ApiProperty()
    priceBeforeOff?: number

    @ApiProperty()
    price: number

    @ApiProperty()
    description: string

    @ApiProperty()
    colorName: string

    @ApiProperty()
    colorHex: string

    @ApiProperty()
    slug: string

    @ApiProperty()
    image: string

    @ApiProperty()
    categoriesId: string[]

    @ApiProperty()
    productsId: string[]
}
