import { Module } from '@nestjs/common';
import { MarcadoresModule } from 'src/marcadores/marcadores.module';
import { SocketsGateway } from './sockets.gateway';
import { SocketsService } from './sockets.service';

@Module({
  providers: [SocketsGateway, SocketsService],
  imports: [MarcadoresModule],
})
export class SocketsModule {}
