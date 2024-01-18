import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class SearchRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', nullable: false })
  term!: string

  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string', nullable: true, required: false })
  order?: string
}