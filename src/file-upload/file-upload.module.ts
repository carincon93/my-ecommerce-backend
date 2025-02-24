import { MiddlewareConsumer, Module } from '@nestjs/common'
import { FileUploadService } from './file-upload.service'
import { FileUploadController } from './file-upload.controller'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { SetFileNameMiddleware } from './set-filename.middleware'

@Module({
    controllers: [FileUploadController],
    providers: [FileUploadService],
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    // Usa el nombre personalizado del middleware
                    const customName = req.body.customFileName || Date.now()
                    const extension = file.originalname.split('.').pop()
                    const filename = `${customName}.${extension}`
                    cb(null, filename)
                },
            }),
        }),
    ],
})
export class FileUploadModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SetFileNameMiddleware).forRoutes('file-upload/upload')
    }
}
