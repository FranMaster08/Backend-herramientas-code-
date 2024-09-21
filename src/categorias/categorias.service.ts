import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categorias } from 'src/entities/Categorias';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {
  private readonly logger = new Logger(CategoriasService.name);

  constructor(
    @InjectRepository(Categorias)
    private readonly categoriasRepository: Repository<Categorias>,
  ) {}

  // Método para crear una nueva categoría
  async create(createCategoriaDto: CreateCategoriaDto) {
    this.logger.log('Creating a new category', createCategoriaDto.nombre);

    // Verificar si la categoría ya existe por nombre
    const categoriaEncontrada = await this.categoriasRepository.findOne({
      where: { nombre: createCategoriaDto.nombre },
    });

    if (categoriaEncontrada) {
      this.logger.error(
        `La categoría con nombre ${createCategoriaDto.nombre} ya existe!`,
      );
      throw new ConflictException(
        `La categoría con nombre ${createCategoriaDto.nombre} ya existe!`,
      );
    }

    // Guardar nueva categoría
    const resultado = await this.categoriasRepository.save(createCategoriaDto);
    this.logger.log(
      `La categoría con nombre ${createCategoriaDto.nombre} creada exitosamente`,
    );
    return resultado;
  }

  // Método para obtener todas las categorías
  async findAll() {
    this.logger.log('Fetching all categories');
    const categorias = await this.categoriasRepository.find();

    if (categorias.length === 0) {
      this.logger.warn('No se encontraron categorías');
    } else {
      this.logger.log(`Se encontraron ${categorias.length} categorías`);
    }

    return categorias;
  }

  // Método para obtener una categoría por ID
  async findOne(id: number) {
    this.logger.log(`Fetching category with ID ${id}`);
    const categoria = await this.categoriasRepository.findOne({
      where: { id },
    });

    if (!categoria) {
      this.logger.error(`Categoría con ID ${id} no encontrada`);
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    this.logger.log(`Categoría con ID ${id} encontrada`);
    return categoria;
  }

  // Método para actualizar una categoría por ID
  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    this.logger.log(`Updating category with ID ${id}`);

    const categoria = await this.categoriasRepository.findOne({
      where: { id },
    });

    if (!categoria) {
      this.logger.error(`Categoría con ID ${id} no encontrada para actualizar`);
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    await this.categoriasRepository.update(id, updateCategoriaDto);
    this.logger.log(`Categoría con ID ${id} actualizada con éxito`);
    
    return this.findOne(id);  // Retorna la categoría actualizada
  }

  // Método para eliminar una categoría por ID
  async remove(id: number) {
    this.logger.log(`Removing category with ID ${id}`);

    const categoria = await this.categoriasRepository.findOne({
      where: { id },
    });

    if (!categoria) {
      this.logger.error(`Categoría con ID ${id} no encontrada para eliminar`);
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    await this.categoriasRepository.remove(categoria);
    this.logger.log(`Categoría con ID ${id} eliminada con éxito`);

    return { message: `Categoría con ID ${id} eliminada` };
  }
}
