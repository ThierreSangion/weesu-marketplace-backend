export class FullProductResponse {
    id: string = '';
    title: string = '';
    price!: number;
    original_price!: number;
    plain_text!: string;
    pictures!: {
      url: string;
    }[];
    attributes!: {
      name: string;
      value_name: string;
    }[];
}
