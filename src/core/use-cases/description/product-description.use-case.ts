import { BadRequestException, Injectable } from '@nestjs/common';
import { Input } from './input';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { IMercadoLivreProvider } from '@core/providers/mercado-livre/mercado-livre.interface';
import { Output } from './output';


@Injectable()
export class ProductDescription{
  constructor(
    private readonly mercadoLivreProvider: IMercadoLivreProvider
  ){}
  async execute(input: Input): Promise<Output>{
    const error = await validate(plainToInstance(Input, input))

    if(error.length){
      throw new BadRequestException("Invalid Field")
    }

    const mercado_livre_description = await this.mercadoLivreProvider.getProductDescription(input.id);

    return {
      data: {
        text: mercado_livre_description.text ?? "",
        plain_text: mercado_livre_description.plain_text
      }
    };
 }
}

