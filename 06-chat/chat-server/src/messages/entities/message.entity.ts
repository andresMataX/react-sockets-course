import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('message')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  message: string;

  @Column('timestamp', { default: new Date() })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.messageAuthor)
  author: User;

  @ManyToOne(() => User, (user) => user.messageDestination)
  destination: User;
}
