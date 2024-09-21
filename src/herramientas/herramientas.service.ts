import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Herramientas } from '../entities/Herramientas';
import { CreateHerramientaDto } from './dto/create-herramienta.dto';
import { UpdateHerramientaDto } from './dto/update-herramienta.dto';
import { Categorias } from '../entities/Categorias';

@Injectable()
export class HerramientasService {
  private readonly logger = new Logger(HerramientasService.name);

  constructor(
    @InjectRepository(Herramientas)
    private readonly herramientasRepository: Repository<Herramientas>,

    @InjectRepository(Categorias)
    private readonly categoriasRepository: Repository<Categorias>,
  ) {}

  async create(createHerramientaDto: CreateHerramientaDto) {
    this.logger.log('Creating a new herramienta', createHerramientaDto.nombre);

    const categoria = await this.categoriasRepository.findOne({
      where: { id: createHerramientaDto.idCategoria },
    });

    if (!categoria) {
      this.logger.warn(
        `Categoria con ID ${createHerramientaDto.idCategoria} no encontrada`,
      );
      throw new BadRequestException('Categoria no encontrada');
    }

    const herramientaExistente = await this.herramientasRepository.findOne({
      where: { nombre: createHerramientaDto.nombre },
      relations: ['idCategoria2'],
    });

    if (herramientaExistente) {
      this.logger.warn(
        `Herramienta con nombre ${createHerramientaDto.nombre} encontrada`,
      );
      throw new ConflictException('La Herramienta ya existe');
    }

    const herramienta = this.herramientasRepository.create({
      ...createHerramientaDto,
      idCategoria2: categoria,
    });

    await this.herramientasRepository.save(herramienta);

    this.logger.debug(`Herramienta creada con ID ${herramienta.id}`);
    return herramienta;
  }

  async findAll() {
    this.logger.log('Fetching all herramientas');
    const herramientas = await this.herramientasRepository.find({
      relations: ['idCategoria2'],
    });

    if (herramientas.length === 0) {
      this.logger.warn('No se encontraron herramientas');
    } else {
      this.logger.debug(`Se encontraron ${herramientas.length} herramientas`);
    }

    return herramientas;
  }

  async findOne(id: number) {
    this.logger.log(`Fetching herramienta with ID ${id}`);

    const herramienta = await this.herramientasRepository.findOne({
      where: { id },
      relations: ['idCategoria2'],
    });

    if (!herramienta) {
      this.logger.error(`Herramienta con ID ${id} no encontrada`);
      throw new NotFoundException(`Herramienta con ID ${id} no encontrada`);
    }

    this.logger.debug(`Herramienta con ID ${id} encontrada`);
    return herramienta;
  }

  async update(id: number, updateHerramientaDto: UpdateHerramientaDto) {
    this.logger.log(`Updating herramienta with ID ${id}`);

    const herramienta = await this.herramientasRepository.findOne({
      where: { id },
    });
    if (!herramienta) {
      this.logger.error(
        `Herramienta con ID ${id} no encontrada para actualizar`,
      );
      throw new Error(`Herramienta con ID ${id} no encontrada`);
    }

    await this.herramientasRepository.update(id, updateHerramientaDto);
    this.logger.debug(`Herramienta con ID ${id} actualizada`);

    return this.findOne(id); // Retorna la herramienta actualizada
  }

  async remove(id: number) {
    this.logger.log(`Removing herramienta with ID ${id}`);

    const herramienta = await this.herramientasRepository.findOne({
      where: { id },
    });
    if (!herramienta) {
      this.logger.error(`Herramienta con ID ${id} no encontrada para eliminar`);
      throw new Error(`Herramienta con ID ${id} no encontrada`);
    }

    await this.herramientasRepository.remove(herramienta);
    this.logger.debug(`Herramienta con ID ${id} eliminada`);

    return { message: `Herramienta con ID ${id} eliminada` };
  }
}
