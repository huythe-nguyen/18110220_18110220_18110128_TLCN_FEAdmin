export class CartItem {
  id!: string;
  size: string
  product: string
  colour: string;
  quantity: number;
  productCode: string;
  productName: string;
  price:string;
  Total:string;

}
export class Carts{
  id!: string;
  userId!: string;
  products:[CartItem] ;
  total: number;
  email:string;
  displayName:string;
  timeOrder:Date;
  timeSucess:Date;
  codeOder:string;
  state:string;
  note:string;
}
