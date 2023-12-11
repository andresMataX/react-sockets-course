import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { Payload } from 'src/auth/interfaces';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });

    if (user) throw new BadRequestException('User already exists');

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: bcrypt.hashSync(createUserDto.password, 10),
    });

    await this.usersRepository.save(newUser);

    delete newUser.password;

    return { ...newUser, token: this.getJwtToken({ id: newUser.id }) };
  }

  async findAll() {
    const users = await this.usersRepository.find({
      order: {
        online: 'DESC',
      },
    });

    return users.map((user) => {
      delete user.password;
      return user;
    });
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new BadRequestException('User not found');
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) throw new UnauthorizedException('Bad credentials');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new BadRequestException('User not found');

    user.online = updateUserDto.online;
    await this.usersRepository.save(user);

    return user;
  }

  private getJwtToken(payload: Payload) {
    const token = this.jwtService.sign(payload);

    return token;
  }
}
