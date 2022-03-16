import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Page {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  @IsNotEmpty()
  title?: string;

  @Column()
  body?: string;
}
