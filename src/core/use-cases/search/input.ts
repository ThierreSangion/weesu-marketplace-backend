import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class Input {
  @IsString()
  @IsNotEmpty()
  term!: string

  @IsString()
  @IsOptional()
  order?: string

  @IsString()
  @IsOptional()
  id?: string;
}