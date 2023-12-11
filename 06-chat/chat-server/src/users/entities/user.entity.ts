import { Message } from 'src/messages/entities/message.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('boolean', { default: false })
  online: boolean;

  @OneToMany(() => Message, (message) => message.author)
  messageAuthor: Message;

  @OneToMany(() => Message, (message) => message.destination)
  messageDestination: Message;
}
