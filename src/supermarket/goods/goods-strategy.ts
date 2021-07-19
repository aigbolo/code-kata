export interface GoodsStrategy {
  totalPrice(orderUnitAmount: number): number;
}

export interface DiscountCampaign {
  discountEveryUnit: number;
  discountUnit: number;
  getDiscountAmount(orderUnitAmount: number): number;
}
