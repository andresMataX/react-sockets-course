import { Module } from '@nestjs/common';
import { MessagesModule } from 'src/messages/messages.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from '../auth/auth.module';
import { SocketsGateway } from './sockets.gateway';
import { SocketsService } from './sockets.service';

@Module({
  providers: [SocketsGateway, SocketsService],
  imports: [AuthModule, UsersModule, MessagesModule],
})
export class SocketsModule {}
