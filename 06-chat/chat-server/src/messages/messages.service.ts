import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const { author_id, destination_id, message } = createMessageDto;

    const newMessage = this.messageRepository.create({
      message,
      author: { id: author_id },
      destination: { id: destination_id },
    });

    return await this.messageRepository.save(newMessage);
  }

  async findAll() {
    return `This action returns all messages`;
  }

  async findAllByUser(id: string) {
    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.author', 'author')
      .leftJoinAndSelect('message.destination', 'destination')
      .where('message.authorId = :userId', { userId: id })
      .orWhere('message.destinationId = :recipientId', { recipientId: id })
      .orderBy('message.created_at', 'DESC')
      .limit(30)
      .getMany();

    return messages;
  }
}
