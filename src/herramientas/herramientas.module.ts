import { Module } from '@nestjs/common';
import { HerramientasService } from './herramientas.service';
import { HerramientasController } from './herramientas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorias } from 'src/entities/Categorias';
import { Herramientas } from 'src/entities/Herramientas';

@Module({
  imports: [
    TypeOrmModule.forFeature([Herramientas, Categorias]), // Registra las entidades Herramientas y Categorias
  ],
  controllers: [HerramientasController],
  providers: [HerramientasService],
})
export class HerramientasModule {}
