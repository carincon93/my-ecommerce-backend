import { Module } from '@nestjs/common'
import { PhotoService } from './photo.service'
import { PhotoController } from './photo.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
    controllers: [PhotoController],
    providers: [PhotoService],
    imports: [PrismaModule],
})
export class PhotoModule {}
