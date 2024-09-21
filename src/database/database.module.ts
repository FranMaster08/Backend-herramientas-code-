import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorias } from 'src/entities/Categorias';
import { Herramientas } from 'src/entities/Herramientas';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // Tipo de base de datos (puede ser 'mysql', 'postgres', 'sqlite', etc.)
      host: 'localhost', // Host de la base de datos
      port: 3306, // Puerto de la base de datos
      username: 'usuario_externo', // Usuario de la base de datos
      password: 'password_seguro', // Contraseña de la base de datos
      database: 'herramientasDb', // Nombre de la base de datos
      entities: [Categorias, Herramientas], // Ruta a las entidades
      synchronize: false, // Sincroniza automáticamente las entidades con la base de datos (en producción debe ser false)
    }),
  ],
})
export class DatabaseModule {}
