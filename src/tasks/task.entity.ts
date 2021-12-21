import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { User } from "../user/entities/user.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((_type => User), (user) => user.tasks, { eager: false })
  //serialization when return json response user data not appear it's not enough we create interceptor
  @Exclude({ toPlainOnly: true })
  user: User;
}
