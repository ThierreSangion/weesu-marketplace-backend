export class Output {
  data!: Array<Partial<{
    id: string;
    title: string
    thumbnail: string
    price: number;
    original_price: number;
  }>>
}