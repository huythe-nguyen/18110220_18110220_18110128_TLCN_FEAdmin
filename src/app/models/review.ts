export class Reviews{
  id!: string;
  review!:string;
  rating!: number;
  product!: string;
  user!: {
    id:string;
  }
  timeOrder!: Date;
  state!: string;
  adminReview!: string;
}
