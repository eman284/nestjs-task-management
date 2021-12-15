import { TasksRepository } from "./tasks.repository";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
export declare class TasksService {
    private taskRepository;
    constructor(taskRepository: TasksRepository);
    getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>;
    getTaskById(id: string): Promise<Task>;
    creatTask(createTaskDto: CreateTaskDto): Promise<Task>;
    deleteTask(id: string): Promise<void>;
    updateTaskStatus(id: string, status: TaskStatus): Promise<Task>;
}
