import { MercadoLivreProvider } from "@core/providers/mercado-livre/mercado-livre.provider";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Input } from "./input";
import { Output } from "./output";
import { validate } from "class-validator";
import { IMercadoLivreProvider } from "@core/providers/mercado-livre/mercado-livre.interface";
import { plainToInstance } from "class-transformer";

@Injectable()
export class Search {
  constructor(
    private readonly mercadoLivreProvider: IMercadoLivreProvider
  ) { }

  async execute(input: Input): Promise<Output> {
    const error = await validate(plainToInstance(Input, input))

    if (error.length) {
      throw new BadRequestException("Invalid Fields");
    }

    const mercado_livre_search = await this.mercadoLivreProvider.search(input.term, input.order);

    return {
      data: mercado_livre_search.results.map((item) => {
        return {
          id: item.id,
          title: item.title,
          thumbnail: item.thumbnail,
          price: item.price,
          original_price: item.original_price
        }
      })
    }
  }
}