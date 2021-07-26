import { Injectable } from '@nestjs/common';
import { Bean } from './goods/Bean';

@Injectable()
export class SupermarketService {
  bean = new Bean();
  getPrice(): number {
    return this.bean.totalPrice(4);
  }
}
