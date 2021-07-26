import { Controller, Get } from '@nestjs/common';
import { SupermarketService } from './supermarket.service';

@Controller('supermarkets')
export class SupermarketController {
  constructor(private readonly supermarketService: SupermarketService) {}

  @Get()
  getPrice(): number {
    return this.supermarketService.getPrice();
  }
}
