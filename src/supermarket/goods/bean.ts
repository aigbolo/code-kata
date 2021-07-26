import _ from 'lodash';
import { GoodsFactory, UnitKind } from './goods-factory';
import { DiscountCampaign, GoodsStrategy } from './goods-strategy';

export class Bean implements GoodsFactory, GoodsStrategy, DiscountCampaign {
  pricePerUnit = 0.65;
  unitKind: UnitKind = UnitKind.POUND;

  discountEveryUnit = 3;
  discountUnit = 1;

  getDiscountAmount(orderUnitAmount: number): number {
    const discountEveryUnit = this.discountEveryUnit + 1;

    const currentOrder = (index: number) => index + 1;
    const isDiscountItem = (order: number) => order % discountEveryUnit === 0;
    const totalDiscountItem = _.range(orderUnitAmount).filter((order) =>
      isDiscountItem(currentOrder(order)),
    ).length;

    return _.multiply(totalDiscountItem, this.pricePerUnit);
  }

  totalPrice(orderUnitAmount: number): number {
    const totalPrice = orderUnitAmount * this.pricePerUnit;
    const discountPrice = this.getDiscountAmount(orderUnitAmount);

    return totalPrice - discountPrice;
  }
}
