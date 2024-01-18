import { DescriptionResponse } from './dtos/product-description.response';
import { IMercadoLivreProvider } from './mercado-livre.interface';

export class FakeMercadoLivreProvider implements IMercadoLivreProvider {
  getProductDescription = jest.fn();
  search = jest.fn();

}