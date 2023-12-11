import { Module } from '@nestjs/common';
import { BandsService } from './bands.service';

@Module({
  providers: [BandsService],
  exports: [BandsService],
})
export class BandsModule {}
