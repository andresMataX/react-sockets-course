import { Injectable } from '@nestjs/common';
import { CreateMarcadoreDto } from './dto/create-marcadore.dto';
import { UpdateMarcadoreDto } from './dto/update-marcadore.dto';
import { Marcador } from './entities/marcador.entity';

@Injectable()
export class MarcadoresService {
  private activos: Record<string, Marcador> = {};

  create(createMarcadoreDto: CreateMarcadoreDto) {
    this.activos[createMarcadoreDto.id] = createMarcadoreDto;
  }

  findAll() {
    return this.activos;
  }

  update(updateMarcadoreDto: UpdateMarcadoreDto) {
    this.activos[updateMarcadoreDto.id] = updateMarcadoreDto;
  }
}
