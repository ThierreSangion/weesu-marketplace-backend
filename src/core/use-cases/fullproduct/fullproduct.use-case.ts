import { BadRequestException, Injectable } from '@nestjs/common';
import { Output } from './output';
import { Input } from './input';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { IMercadoLivreProvider } from '@core/providers/mercado-livre/mercado-livre.interface';


@Injectable()
export class FullProductResponse{
  constructor(
    private readonly mercadoLivreProvider: IMercadoLivreProvider
  ){}
  async executeData(input: Input): Promise<Output>{
    const error = await validate(plainToInstance(Input, input))

    if(error.length){
      throw new BadRequestException("Invalid Field")
    }

    const mercado_livre_description_data = await this.mercadoLivreProvider.getProductData(input.id);

    return {
      data: {
        id: mercado_livre_description_data.id ?? "",
        title: mercado_livre_description_data.title ?? "",
        price: mercado_livre_description_data.price ?? "",
        original_price: mercado_livre_description_data.original_price ?? "",
        pictures: mercado_livre_description_data.pictures?? "",
        attributes: mercado_livre_description_data.attributes ?? "",
        plain_text: mercado_livre_description_data.plain_text ?? ""
      }
    };
 }
}

