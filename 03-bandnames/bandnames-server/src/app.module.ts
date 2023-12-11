import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SocketsModule } from './sockets/sockets.module';
import { BandsModule } from './bands/bands.module';

@Module({
  imports: [
    SocketsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    BandsModule,
  ],
})
export class AppModule {}
