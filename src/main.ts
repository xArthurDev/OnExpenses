import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = new Logger('MAIN');

const checkRunningMode = (): void => {
  const nodeEnv = process.env.NODE_ENV;
  if (!['development', 'production', 'test'].includes(nodeEnv)) {
    logger.error(
      '!!!!! PLEASE, SET THE NODE_ENV VAR INTO YOUR .env FILE and Reload the APP!',
    );
    process.exit();
  }
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
    })
    .setTitle('OnExpenses')
    .setDescription('API para registro e controle de despesas')
    .setVersion(process.env.npm_package_version)
    .addTag('onExpenses')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  logger.verbose(
    `OnExpenses is running in ${process.env.NODE_ENV.toLocaleUpperCase()} mode on port 3000 🚀.` +
      `\nVersion: ${process.env.npm_package_version}`,
  );
}
checkRunningMode();
bootstrap();
