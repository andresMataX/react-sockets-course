import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BandsService } from 'src/bands/bands.service';
import { SocketsService } from './sockets.service';

@WebSocketGateway({ cors: true })
export class SocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(
    private readonly socketsService: SocketsService,
    private readonly bandsService: BandsService,
  ) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    client.emit('current-bands', this.bandsService.getBands());
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('vote-band')
  onVoteBand(_: Socket, id: string) {
    this.wss.emit('current-bands', this.bandsService.increaseVotes(id));
  }

  @SubscribeMessage('delete-band')
  onDeleteBand(_: Socket, id: string) {
    this.wss.emit('current-bands', this.bandsService.removeBand(id));
  }

  @SubscribeMessage('change-band-name')
  onChangeBandName(_: Socket, payload: { id: string; name: string }) {
    this.wss.emit(
      'current-bands',
      this.bandsService.changeName(payload.id, payload.name),
    );
  }

  @SubscribeMessage('create-band')
  onAddBand(_: Socket, name: string) {
    this.wss.emit(
      'current-bands',
      this.bandsService.addBand({
        name,
      }),
    );
  }
}
