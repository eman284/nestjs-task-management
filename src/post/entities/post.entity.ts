import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  @IsNotEmpty()
  title?: string;

  @Column()
  body?: string;

  @Column()
  date?: Date;

  @Column()
  isRead?: boolean;
}
