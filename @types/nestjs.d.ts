import { IApplication } from '../src/decorators/IApplication'
declare module 'nestjs' {
  interface Request {
    application: IApplication;
  }
}
