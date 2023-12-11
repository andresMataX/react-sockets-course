import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { CreateMarcadoreDto } from 'src/marcadores/dto/create-marcadore.dto';
import { MarcadoresService } from 'src/marcadores/marcadores.service';

@WebSocketGateway({ cors: true })
export class SocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Socket;

  constructor(private readonly marcadoresService: MarcadoresService) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    client.emit('marcadores-activos', this.marcadoresService.findAll());
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('client disconnected', client.id);
  }

  @SubscribeMessage('marcador-nuevo')
  onMarcadorNuevo(
    @MessageBody() payload: CreateMarcadoreDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.marcadoresService.create(payload);
    client.broadcast.emit('marcador-nuevo', payload);
  }
}
