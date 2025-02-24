import { ApiProperty } from '@nestjs/swagger'

export class CreatePhotoDto {
    @ApiProperty()
    productId: string

    @ApiProperty()
    image: string

    @ApiProperty()
    isSizeGuide: boolean
}
