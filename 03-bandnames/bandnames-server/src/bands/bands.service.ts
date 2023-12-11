import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateBandDto } from './dto/create-band.dto';
import { Band } from './entities/band.entity';

@Injectable()
export class BandsService {
  private bands: Band[] = [
    {
      id: uuidv4(),
      name: 'Get Scared',
      votes: 0,
    },
    {
      id: uuidv4(),
      name: 'Linkin Park',
      votes: 0,
    },
    {
      id: uuidv4(),
      name: 'Motionless in White',
      votes: 0,
    },
    {
      id: uuidv4(),
      name: 'Stain the Canvas',
      votes: 0,
    },
  ];

  create(createBandDto: CreateBandDto) {
    const band: Band = {
      id: uuidv4(),
      name: createBandDto.name,
      votes: 0,
    };

    return band;
  }

  addBand(createBandDto: CreateBandDto) {
    const band = this.create(createBandDto);
    this.bands.push(band);

    return this.bands;
  }

  removeBand(id: string) {
    this.bands = this.bands.filter((band) => band.id !== id);

    return this.bands;
  }

  getBands() {
    return this.bands;
  }

  increaseVotes(id: string) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.votes++;
      }

      return band;
    });

    return this.bands;
  }

  changeName(id: string, name: string) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.name = name;
      }

      return band;
    });

    return this.bands;
  }
}
