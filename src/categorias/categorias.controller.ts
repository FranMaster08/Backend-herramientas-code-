import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'; // Importa los decoradores de Swagger
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@ApiTags('categorias') // Agrupa todas las rutas de este controlador bajo la etiqueta 'categorias' en Swagger
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @ApiOperation({ summary: 'Crea una nueva categoría' }) // Descripción de la operación
  @ApiResponse({
    status: 201,
    description: 'La categoría ha sido creada con éxito.',
  }) // Respuesta exitosa
  @ApiResponse({ status: 400, description: 'Datos inválidos.' }) // Error de validación
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todas las categorías' })
  @ApiResponse({ status: 200, description: 'Lista de todas las categorías.' })
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una categoría por ID' })
  @ApiParam({ name: 'id', description: 'ID de la categoría', example: 1 }) // Descripción del parámetro 'id'
  @ApiResponse({ status: 200, description: 'La categoría ha sido encontrada.' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza una categoría por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la categoría a actualizar',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'La categoría ha sido actualizada con éxito.',
  })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriasService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina una categoría por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la categoría a eliminar',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'La categoría ha sido eliminada con éxito.',
  })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id);
  }
}
