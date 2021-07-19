import { GoodsFactory, UnitKind } from './goods-factory';
import { DiscountCampaign, GoodsStrategy } from './goods-strategy';

export class Bean implements GoodsFactory, GoodsStrategy, DiscountCampaign {
  pricePerUnit = 0.65;
  unitKind: UnitKind = UnitKind.POUND;

  discountEveryUnit = 3;
  discountUnit = 1;

  getDiscountAmount(orderUnitAmount: number): number {
    let discountTickets = 0;
    for (let order = 1; order <= orderUnitAmount; order++) {
      if (order % this.discountEveryUnit === 0) {
        discountTickets++;
        if (discountTickets + order > orderUnitAmount) {
          return (discountTickets - 1) * this.pricePerUnit;
        }
      }
    }

    return discountTickets * this.pricePerUnit;
  }

  totalPrice(orderUnitAmount: number): number {
    const totalPrice = orderUnitAmount * this.pricePerUnit;
    const discountPrice = this.getDiscountAmount(orderUnitAmount);

    return totalPrice - discountPrice;
  }
}
