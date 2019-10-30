import { Discount } from '../value-objects';

export class Product {
  private _id: string;
  public get id(): string {
    return this._id;
  }

  private _priceInCents: number;
  public get priceInCents(): number {
    return this._priceInCents;
  }

  private _title: string;
  public get title(): string {
    return this._title;
  }

  private _description: string;
  public get description(): string {
    return this._description;
  }

  private _discount: Discount;
  public get discount(): Discount {
    return this._discount;
  }

  constructor(
    id: string,
    priceInCents: number,
    title: string,
    description: string,
  ) {
    this._id = id;
    this._priceInCents = priceInCents;
    this._title = title;
    this._description = description;
  }

  public updateDiscount(discount: Discount): this {
    this._discount = discount;

    return this;
  }
}
