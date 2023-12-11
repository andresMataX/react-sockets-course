import { Module } from '@nestjs/common';
import { SocketsModule } from './sockets/sockets.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [SocketsModule, TicketsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
