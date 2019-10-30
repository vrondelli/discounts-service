export class Discount {
  constructor(public percentage: number, public valueInCents: number) {
    Object.freeze(this);
  }
}
