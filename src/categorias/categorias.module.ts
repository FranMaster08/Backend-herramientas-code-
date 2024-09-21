import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorias } from 'src/entities/Categorias';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categorias]), // Registra las entidades Herramientas y Categorias
  ],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
