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
import { HerramientasService } from './herramientas.service';
import { CreateHerramientaDto } from './dto/create-herramienta.dto';
import { UpdateHerramientaDto } from './dto/update-herramienta.dto';

@ApiTags('herramientas') // Agrupa todas las rutas del controlador bajo la etiqueta 'herramientas' en Swagger
@Controller('herramientas')
export class HerramientasController {
  constructor(private readonly herramientasService: HerramientasService) {}

  @Post()
  @ApiOperation({ summary: 'Crea una nueva herramienta' }) // Descripción del endpoint en Swagger
  @ApiResponse({
    status: 201,
    description: 'La herramienta ha sido creada con éxito.',
  }) // Respuesta para éxito
  @ApiResponse({ status: 400, description: 'Datos inválidos.' }) // Error de validación
  create(@Body() createHerramientaDto: CreateHerramientaDto) {
    return this.herramientasService.create(createHerramientaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todas las herramientas' }) // Descripción del endpoint en Swagger
  @ApiResponse({ status: 200, description: 'Lista de todas las herramientas.' }) // Respuesta para éxito
  findAll() {
    return this.herramientasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una herramienta por ID' }) // Descripción del endpoint en Swagger
  @ApiParam({ name: 'id', description: 'ID de la herramienta', example: 1 }) // Descripción del parámetro `id`
  @ApiResponse({
    status: 200,
    description: 'La herramienta ha sido encontrada.',
  }) // Respuesta para éxito
  @ApiResponse({ status: 404, description: 'Herramienta no encontrada.' }) // Error si no se encuentra
  findOne(@Param('id') id: string) {
    return this.herramientasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza una herramienta por ID' }) // Descripción del endpoint en Swagger
  @ApiParam({
    name: 'id',
    description: 'ID de la herramienta a actualizar',
    example: 1,
  }) // Descripción del parámetro `id`
  @ApiResponse({
    status: 200,
    description: 'La herramienta ha sido actualizada con éxito.',
  }) // Respuesta para éxito
  @ApiResponse({ status: 404, description: 'Herramienta no encontrada.' }) // Error si no se encuentra
  update(
    @Param('id') id: string,
    @Body() updateHerramientaDto: CreateHerramientaDto,
  ) {
    return this.herramientasService.update(+id, updateHerramientaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina una herramienta por ID' }) // Descripción del endpoint en Swagger
  @ApiParam({
    name: 'id',
    description: 'ID de la herramienta a eliminar',
    example: 1,
  }) // Descripción del parámetro `id`
  @ApiResponse({
    status: 200,
    description: 'La herramienta ha sido eliminada con éxito.',
  }) // Respuesta para éxito
  @ApiResponse({ status: 404, description: 'Herramienta no encontrada.' }) // Error si no se encuentra
  remove(@Param('id') id: string) {
    return this.herramientasService.remove(+id);
  }
}
