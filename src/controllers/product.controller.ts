import {
  Get,
  BadRequestException,
  HttpCode,
  HttpStatus,
  Query,
  NotFoundException,
  Controller,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ProductDescription } from "@core/use-cases/description/product-description.use-case";
import { Search } from "@core/use-cases";
import { DescriptionResponse } from "./dtos/description.response";

@ApiTags("Product Controlller")
@Controller("product")
export class ProductController {
  constructor(
    private readonly productDescriptionUseCase: ProductDescription,
    private readonly searchUseCase: Search
  ) {}

  @ApiOperation({ summary: `Get product description by search term and id` })
  @ApiBadRequestResponse({
    description: "If the search term or product ID is missing",
    type: BadRequestException,
  })
  @ApiResponse({
    description: "Return the product with its description",
    type: DescriptionResponse,
  })
  @Get("description-by-term-and-id")
  @HttpCode(HttpStatus.OK)
  async getProductDescriptionByTermAndId(
    @Query("term") term: string,
    @Query("id") id: string
  ): Promise<DescriptionResponse> {
    if (!term) {
      throw new BadRequestException("Search term is required");
    }
    if (!id) {
      throw new BadRequestException("Product ID is required");
    }

    const searchResult = await this.searchUseCase.execute({ term });
    const productList = searchResult.data;

    const product = productList.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException("Product not found with the given ID");
    }

    const descriptionResult = await this.productDescriptionUseCase.execute({
      id,
    });
    const description = descriptionResult.data;

    return {
      data: {
        id: product.id ?? "",
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        original_price: product.original_price,
        text: description.text,
        plain_text: description.plain_text,
      },
    };
  }

}

