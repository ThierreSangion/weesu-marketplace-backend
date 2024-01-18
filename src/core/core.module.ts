import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './config.module-definition';
import { MercadoLivreProvider } from './providers/mercado-livre/mercado-livre.provider';
import { IMercadoLivreProvider } from './providers/mercado-livre/mercado-livre.interface';
import {  ProductDescription, Search } from './use-cases';
import { FullProductResponse } from './use-cases/fullproduct/fullproduct.use-case';

const providers = [
  Search,
  {
    provide: IMercadoLivreProvider,
    useValue: new MercadoLivreProvider()
  },
  ProductDescription,
  {
    provide: IMercadoLivreProvider,
    useValue: new MercadoLivreProvider()
  },
  FullProductResponse,
  {
    provide: IMercadoLivreProvider,
    useValue: new MercadoLivreProvider()
  }
];

@Module({
  exports: providers,
  providers: providers
})
export class CoreModule extends ConfigurableModuleClass { }
