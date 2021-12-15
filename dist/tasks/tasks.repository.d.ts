import { Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
export declare class TasksRepository extends Repository<Task> {
    getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>;
    creatTask(createTaskDto: CreateTaskDto): Promise<Task>;
}
