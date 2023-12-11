import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MensajePersonalDto } from './dto/mensaje-personal.dto';
import { SocketsService } from './sockets.service';

@WebSocketGateway()
export class SocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(private readonly socketsService: SocketsService) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    this.socketsService.connect(client, this.wss);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.socketsService.disconnect(client, this.wss);
  }

  @SubscribeMessage('mensaje-personal')
  async onMensajePersonal(@MessageBody() payload: MensajePersonalDto) {
    const newMessage = await this.socketsService.saveMessage(payload);

    this.wss.to(payload.para).emit('mensaje-personal', newMessage);

    this.wss.to(payload.de).emit('mensaje-personal', newMessage);
  }
}
