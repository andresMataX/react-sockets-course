import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Server, Socket } from 'socket.io';
import { Payload } from 'src/auth/interfaces';
import { MessagesService } from 'src/messages/messages.service';
import { UsersService } from 'src/users/users.service';
import { MensajePersonalDto } from './dto/mensaje-personal.dto';

@Injectable()
export class SocketsService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService,
  ) {}

  async connect(client: Socket, wss: Server) {
    const token = client.handshake.auth.token as string;

    try {
      const { id }: Payload = this.jwtService.verify(token);

      await this.usersService.update(id, {
        online: true,
      });

      client.join(id);

      wss.emit('lista-usuarios', await this.usersService.findAll());
    } catch (error) {
      client.disconnect();
      return;
    }
  }

  async disconnect(client: Socket, wss: Server) {
    const token = client.handshake.auth.token as string;

    const { id }: Payload = this.jwtService.verify(token);

    await this.usersService.update(id, {
      online: false,
    });

    wss.emit('lista-usuarios', await this.usersService.findAll());
  }

  async saveMessage(payload: MensajePersonalDto) {
    const newMessage = await this.messagesService.create({
      author_id: payload.de,
      destination_id: payload.para,
      message: payload.mensaje,
    });

    return newMessage;
  }
}
