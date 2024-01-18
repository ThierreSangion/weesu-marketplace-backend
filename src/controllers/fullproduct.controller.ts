import { FullProductResponse } from "@core/use-cases/fullproduct/fullproduct.use-case";
import { BadRequestException, Controller, Get, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DescriptionResponse } from "./dtos/description.response";
import { ProductDescription } from "@core/use-cases/description/product-description.use-case";
import { FullProducDatatResponse } from "./dtos/full-product.response";

 @ApiTags("FullProduct Controller")
 @Controller("fullproduct")
 export class FullProductController{
   constructor(
    private readonly fullProductUseCase:FullProductResponse,
     private readonly productDescriptionUseCase: ProductDescription
   ){}
   @ApiOperation({ summary: `Get product description by search id ` })
   @ApiBadRequestResponse({
     description: "If product ID is missing",
     type: BadRequestException,
   })
   @ApiResponse({
     description: "Return the product with its description",
     type: DescriptionResponse,
   })
   @Get("full-product-by-id")
   @HttpCode(HttpStatus.OK)
   async getProductDescriptionByTermAndIdNew(
     @Query("id") id: string
   ): Promise<FullProducDatatResponse> {
    
     if (!id) {
       throw new BadRequestException("Product ID is required");
     }

     const productResult = await this.productDescriptionUseCase.execute({id});
     const productDescription = productResult.data;


     const descriptionResult = await this.fullProductUseCase.executeData({
       id,
     });
     const description = descriptionResult.data;


     return {
       data: {
         id: description.id,
         title: description.title,
         price: description.price,
         original_price: description.original_price,
         plain_text: productDescription.plain_text,
         pictures: description.pictures,
         attributes: description.attributes
       },
     };
    }
 }