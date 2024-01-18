import { ApiProperty } from "@nestjs/swagger";

class Data {
  @ApiProperty({ type: 'string', nullable: true })
  text?: string

  @ApiProperty({ type: 'string', nullable: true })
  plain_text?: string

  @ApiProperty({ type: 'string', nullable: true })
  id!: string;
  
  @ApiProperty({ type: 'string', nullable: true })
  title?: string

  @ApiProperty({ type: 'string', nullable: true })
  thumbnail?: string

  @ApiProperty({ type: 'number', nullable: true })
  price?: number

  @ApiProperty({ type: 'number', nullable: true })
  original_price?: number
}



export class DescriptionResponse {
  @ApiProperty({ type: Data, nullable: false })
  data!: Data
}


