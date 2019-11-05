import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'discounts',
      protoPath: join(__dirname, 'discounts.proto'),
    },
  });

  // tslint:disable-next-line: no-console
  app.listen(() => console.log('Microservice is listening'));
}

bootstrap();
