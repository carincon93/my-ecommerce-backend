import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class SetFileNameMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Middleware interceptado:', req.body)

        req.body.customFileName = 'mi-nombre-personalizado'
        next()
    }
}
