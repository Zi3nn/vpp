import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Dự án NestJS API')
    .setDescription('Danh sách các API của ứng dụng')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,               // Tự động loại bỏ các field không được định nghĩa trong DTO
    forbidNonWhitelisted: true,    // Trả về lỗi nếu có field lạ gửi lên
    transform: true,               // Tự động convert kiểu dữ liệu (vd: string "1" thành number 1)
  }));

  const port = process.env.PORT ?? 3000
  await app.listen(port);

  console.log(`The website run at localhost:${port}`)
  
}
bootstrap();
