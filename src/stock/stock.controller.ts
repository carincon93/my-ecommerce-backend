import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { StockService } from './stock.service'
import { CreateStockDto } from './dto/create-stock.dto'
import { UpdateStockDto } from './dto/update-stock.dto'

@Controller('product/:productId/stock')
export class StockController {
    constructor(private readonly stockService: StockService) {}

    @Post()
    async create(@Param('productId') productId: string, @Body() createStockDto: CreateStockDto) {
        return this.stockService.create(productId, createStockDto)
    }

    @Get()
    findAll(@Param('productId') productId: string) {
        return this.stockService.findAll(productId)
    }

    @Get(':stockId')
    findOne(@Param('stockId') stockId: string) {
        return this.stockService.findOne(stockId)
    }

    @Patch(':stockId')
    update(@Param('stockId') stockId: string, @Body() updateStockDto: UpdateStockDto) {
        return this.stockService.update(stockId, updateStockDto)
    }

    @Delete(':stockId')
    remove(@Param('stockId') stockId: string) {
        return this.stockService.remove(stockId)
    }
}
