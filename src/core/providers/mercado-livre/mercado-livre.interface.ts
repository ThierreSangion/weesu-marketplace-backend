import { FullProductResponse } from './dtos/full-product.response';
import { DescriptionResponse } from './dtos/product-description.response';
import { SearchResponse } from './dtos/search.response';

export abstract class IMercadoLivreProvider {
  abstract search(term: string, order: any): Promise<SearchResponse>;
  abstract getProductDescription(id: string): Promise<DescriptionResponse>;
  abstract getProductData(id: string): Promise<FullProductResponse>;
}