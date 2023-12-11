import { Module } from '@nestjs/common';
import { SocketsModule } from './sockets/sockets.module';
import { MarcadoresModule } from './marcadores/marcadores.module';

@Module({
  imports: [SocketsModule, MarcadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
