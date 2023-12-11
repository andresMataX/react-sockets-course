import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AsignarTicketDto } from './dto/asignar-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  private ultimoNumero = 0;
  private pendientes: Ticket[] = [];
  private asignados: Ticket[] = [];

  crearTicket() {
    const nuevoTicket: Ticket = {
      id: uuidv4(),
      numero: this.siguienteNumero(),
      escritorio: null,
      agente: null,
    };

    this.pendientes.push(nuevoTicket);

    return nuevoTicket;
  }

  siguienteNumero() {
    return ++this.ultimoNumero;
  }

  ultimos13() {
    return this.asignados.slice(0, 13);
  }

  asignarTicket({ agente, escritorio }: AsignarTicketDto) {
    if (this.pendientes.length === 0) return null;

    const siguienteTicket = this.pendientes.shift();

    siguienteTicket.agente = agente;
    siguienteTicket.escritorio = escritorio;

    this.asignados.unshift(siguienteTicket);

    return siguienteTicket;
  }
}
