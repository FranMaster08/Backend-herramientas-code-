import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
export class CreateCategoriaDto {
  @ApiProperty({
    type: 'string',
    example: 'Soldadura',
    description: 'Este campo tendra como nombre un categoria de herramientas',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
