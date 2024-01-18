import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import 'dotenv/config'
import { CoreModule } from '@core/core.module';
import { SearchController } from './controllers/search.controller';
import { ProductController } from './controllers/product.controller';
import { FullProductController } from './controllers/fullproduct.controller';

@Module({
  imports: [
    CoreModule.register({
      isGlobal: true,
    }),
  ],
  controllers: [
    SearchController,
    ProductController,
    FullProductController
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes();
  }
}
