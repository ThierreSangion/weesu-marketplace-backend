import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class Input {
  @IsString()
  @IsNotEmpty()
  id!: string
}