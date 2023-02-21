import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

const start = async () => {
  const { CURRENT_HOST, PORT = 5000 } = process.env;
  try {
    const app = await NestFactory.create(AppModule, { cors: true });

    // app.use(
    //   cors({
    //     origin: '*',
    //     // origin: true,
    //     credentials: true,
    //     allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    //   }),
    // );

    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
      .setTitle('Petly')
      .setDescription('Docs REST API')
      .setVersion('0.0.1')
      .addServer(`${CURRENT_HOST ? `http://localhost:${PORT}` : 'https://node-team-project.onrender.com'}`)
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);

    await app.listen(PORT, () => console.log(`server start http://localhost:${PORT}/docs`));
  } catch (error) {
    console.error(error);
  }
};

start();
