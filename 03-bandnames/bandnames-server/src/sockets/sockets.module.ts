import { Module } from '@nestjs/common';
import { BandsModule } from 'src/bands/bands.module';
import { SocketsGateway } from './sockets.gateway';
import { SocketsService } from './sockets.service';

@Module({
  providers: [SocketsGateway, SocketsService],
  imports: [BandsModule],
})
export class SocketsModule {}
