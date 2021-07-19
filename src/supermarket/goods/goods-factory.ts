export enum UnitKind {
  PEICE,
  POUND,
}

export interface GoodsFactory {
  pricePerUnit: number;
  unitKind: UnitKind;
}
