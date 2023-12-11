import { Module } from '@nestjs/common';
import { MarcadoresService } from './marcadores.service';

@Module({
  controllers: [],
  providers: [MarcadoresService],
  exports: [MarcadoresService],
})
export class MarcadoresModule {}
