import { Module } from '@nestjs/common';
import { TicketsModule } from 'src/tickets/tickets.module';
import { SocketsGateway } from './sockets.gateway';
import { SocketsService } from './sockets.service';

@Module({
  providers: [SocketsGateway, SocketsService],
  imports: [TicketsModule],
})
export class SocketsModule {}
