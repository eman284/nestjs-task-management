import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
export declare class TasksController {
    private taskService;
    constructor(taskService: TasksService);
    getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>;
    getTaskById(id: string): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    deleteTask(id: string): Promise<void>;
    updateTask(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task>;
}
