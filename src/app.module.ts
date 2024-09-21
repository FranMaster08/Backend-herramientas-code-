import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { HerramientasModule } from './herramientas/herramientas.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [HerramientasModule, CategoriasModule, DatabaseModule],
  providers: [AppService],
})
export class AppModule {}
