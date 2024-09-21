import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateHerramientaDto {
  @ApiProperty({
    example: 'Martillo',
    description: 'El nombre de la herramienta',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @ApiProperty({
    example: 1.5,
    description: 'El peso de la herramienta en kilogramos',
  })
  @IsNumber()
  @Min(0.1, { message: 'El peso debe ser mayor que 0' })
  peso: number;

  @ApiProperty({
    example: 1,
    description: 'ID de la categoría a la que pertenece la herramienta',
  })
  @IsNumber()
  @IsNotEmpty({ message: 'El ID de la categoría es obligatorio' })
  idCategoria: number;
}
