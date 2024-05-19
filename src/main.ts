import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import('dotenv').then((dotenv) => {
  dotenv.config();
});

const port = process.env.PORT || 3000;

/*
 * rota barra
 * rota / para swagger
 *
 * */



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Catalogo de foilmes API')
    .setDescription('API para catalogo de filmes com NestJS e TypeORM')
    .setVersion('1.0')
    .addTag('filmes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('Press CTRL + C to stop the server');
    console.log('env:', process.env.NODE_ENV || 'development');
  });
}
bootstrap();
