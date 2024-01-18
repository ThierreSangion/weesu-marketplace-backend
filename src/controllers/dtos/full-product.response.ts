import { ApiProperty } from "@nestjs/swagger";

export class Data {
    @ApiProperty({ type: 'string', nullable: true })
    id!: string;
   
    @ApiProperty({ type: 'string', nullable: true })
    title!: string;
   
    @ApiProperty({ type: 'number', nullable: true })
    price!: number;
   
    @ApiProperty({ type: 'number', nullable: true })
    original_price!: number;
   
    @ApiProperty({ type: [{ url: 'string' }], nullable: true })
    pictures!: { url: string }[];
   
    @ApiProperty({ type: [{ name: 'string', value_name: 'string' }], nullable: true })
    attributes!: { name: string, value_name: string }[];
  
    @ApiProperty({ type: 'string', nullable: true })
    plain_text?: string
   }
  
  export class FullProducDatatResponse{
    @ApiProperty({ type: Data, nullable: false })
    data!: Data
  }