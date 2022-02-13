import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../user/entities/user.entity";
import { UpdateTaskStatusModel } from "./dto/update-task-status.model";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller("tasks")
@ApiTags("Tasks")
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger("Tasks Controller");
  constructor(private taskService: TasksService) {
  }

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto, @GetUser() user: User): Promise<Task[]> {
    this.logger.verbose(`${user.username} retrieving all tasks. Filters:${JSON.stringify(filterDto)} `);
    return this.taskService.getTasks(filterDto, user);
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string, @GetUser() user: User): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    this.logger.verbose(`User "${user.username}". Data:${JSON.stringify(createTaskDto)}`);
    return this.taskService.creatTask(createTaskDto, user);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string, @GetUser() user: User): Promise<void> {
    return this.taskService.deleteTask(id, user);
  }


  @Patch("/:id/status")
  updateTask(@Param("id") id: string, @Body() updateTaskStatusDto: UpdateTaskStatusModel, @GetUser() user: User): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(id, status, user);
  }

}
