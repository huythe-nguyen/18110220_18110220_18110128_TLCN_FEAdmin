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
  phone:string;
  address!:string;
  country:string;
  city:string;
  displayName:string;
  timeOrder:Date;
  timeSucess:Date;
  codeOder:string;
  state:string;
  note:string;
  stateOrder:string;
}
