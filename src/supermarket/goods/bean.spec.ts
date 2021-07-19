import { Bean } from './Bean';
import { UnitKind } from './goods-factory';

describe('bean goods', () => {
  it.each`
    pricePerUnit | orderAmountUnit | expectedTotalPrice
    ${0.65}      | ${1}            | ${0.65}
    ${0.65}      | ${2}            | ${1.3}
  `(
    `should return $expectedTotalPrice when price is $pricePerUnit and customer buy bean $orderAmountUnit pound`,
    ({ pricePerUnit, orderAmountUnit, expectedTotalPrice }) => {
      // Arrange
      const bean = new Bean();
      bean.pricePerUnit = pricePerUnit;
      bean.unitKind = UnitKind.POUND;

      // Action
      const actualPrice = bean.totalPrice(orderAmountUnit);

      // Assert
      expect(actualPrice).toBe(expectedTotalPrice);
    },
  );
  describe('get discount', () => {
    it.each`
      orderAmountUnit | expectedAvailableDiscount
      ${1}            | ${0}
      ${3}            | ${1}
      ${6}            | ${2}
    `(
      `should return $expectedTotalDiscount for available unit discount when customer buy bean $orderAmountUnit pound`,
      ({ orderAmountUnit, expectedAvailableDiscount }) => {
        // Arrange
        const bean = new Bean();
        bean.pricePerUnit = 0;
        bean.unitKind = UnitKind.POUND;
        bean.discountEveryUnit = 3;
        bean.discountUnit = 1;

        // Action
        const actualDiscount = bean.getDiscountTicketUnit(orderAmountUnit);

        // Assert
        expect(actualDiscount).toBe(expectedAvailableDiscount);
      },
    );

    it.each`
      pricePerUnit | orderAmountUnit | expectedTotalDiscount
      ${0.65}      | ${2}            | ${0}
      ${0.65}      | ${3}            | ${0}
      ${0.65}      | ${4}            | ${0.65}
      ${0.65}      | ${6}            | ${0.65}
      ${0.65}      | ${7}            | ${0.65}
      ${0.65}      | ${8}            | ${0.65 * 2}
      ${0.65}      | ${9}            | ${0.65 * 2}
      ${0.65}      | ${10}           | ${0.65 * 2}
      ${0.65}      | ${11}           | ${0.65 * 2}
      ${0.65}      | ${12}           | ${0.65 * 3}
    `(
      `should return $expectedTotalDiscount when price is $pricePerUnit and customer buy bean $orderAmountUnit pound`,
      ({ pricePerUnit, orderAmountUnit, expectedTotalDiscount }) => {
        // Arrange
        const bean = new Bean();
        bean.pricePerUnit = pricePerUnit;
        bean.unitKind = UnitKind.POUND;
        bean.discountEveryUnit = 3;
        bean.discountUnit = 1;

        // Action
        const actualDiscount = bean.getDiscountAmount(orderAmountUnit);

        // Assert
        expect(actualDiscount).toBe(expectedTotalDiscount);
      },
    );
  });

  describe('total price with discount', () => {
    it.each`
      pricePerUnit | orderAmountUnit | expectedTotalExpense
      ${0.65}      | ${2}            | ${0.65 * 2}
      ${0.65}      | ${3}            | ${0.65 * 3}
      ${0.65}      | ${4}            | ${0.65 * 4 - 0.65}
      ${0.65}      | ${6}            | ${0.65 * 6 - 0.65}
      ${0.65}      | ${7}            | ${0.65 * 7 - 0.65}
      ${0.65}      | ${8}            | ${0.65 * 8 - 0.65 * 2}
    `(
      `should return $expectedTotalExpense when price is $pricePerUnit and customer buy bean $orderAmountUnit pound`,
      ({ pricePerUnit, orderAmountUnit, expectedTotalExpense }) => {
        // Arrange
        const bean = new Bean();
        bean.pricePerUnit = pricePerUnit;
        bean.unitKind = UnitKind.POUND;
        bean.discountEveryUnit = 3;
        bean.discountUnit = 1;

        // Action
        const totalPrice = bean.totalPrice(orderAmountUnit);

        // Assert
        expect(totalPrice).toBe(expectedTotalExpense);
      },
    );
  });
});
