import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { User } from "../user/entities/user.entity";
import { InternalServerErrorException, Logger } from "@nestjs/common";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  private logger = new Logger("Tasks Repository", { timestamp: true });

  async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder("task");
    query.where({ user });
    if (status) {
      query.andWhere("task.status = :status", { status });
    }
    if (search) {
      query.andWhere("(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))", { search: `%${search}%` });
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      //error.stack = appear part of code where error exist
      this.logger.verbose(`Faild to get tasks for user "${user.username}". Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }


  }

  async creatTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user
    });
    await this.save(task);
    return task;
  }

}
