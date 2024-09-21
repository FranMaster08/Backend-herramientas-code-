import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Herramientas API')
    .setDescription('API para gestionar herramientas')
    .setVersion('1.0')
    .addTag('herramientas') // Puedes añadir etiquetas para organizar tu API
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 'api' es la ruta donde estará Swagger UI

  await app.listen(3000);
  console.log('corriendo en el puerto 3000');
}
bootstrap();
