import { Search } from "@core/use-cases";
import { BadRequestException, Controller, Get, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { SearchRequest } from "./dtos/serarch.request";
import { SearchResponse } from "./dtos/serarch.response";
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Search Controller')
@Controller('search')
export class SearchController {
  constructor(
    private readonly searchUseCase: Search,
  ) { }

  @ApiOperation({ summary: `Get a list of products by term searh` })
  @ApiBadRequestResponse({
    description: `
      If term is missing"
    `,
    type: BadRequestException
  })
  @ApiResponse({
    description: `
      returns a list of products
    `,
    type: SearchResponse
  })
  @Get('products')
  @HttpCode(HttpStatus.OK)
  async authorization(@Query() query: SearchRequest): Promise<SearchResponse> {
    return await this.searchUseCase.execute(query);
  }
}