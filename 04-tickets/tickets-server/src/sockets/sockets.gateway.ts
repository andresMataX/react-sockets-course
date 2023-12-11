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
import { AsignarTicketDto } from 'src/tickets/dto/asignar-ticket.dto';
import { TicketsService } from 'src/tickets/tickets.service';

@WebSocketGateway({ cors: true })
export class SocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(private readonly ticketsService: TicketsService) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('solicitar-ticket')
  onSolicitarTicker() {
    const nuevoTicket = this.ticketsService.crearTicket();

    return nuevoTicket;
  }

  @SubscribeMessage('siguiente-ticket-trabajar')
  onSiguienteTicketTrabajar(@MessageBody() user: AsignarTicketDto) {
    const ticket = this.ticketsService.asignarTicket(user);

    this.wss.emit('ticket-asignado', this.ticketsService.ultimos13());

    return ticket;
  }
}
