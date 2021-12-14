import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTastStatusDto } from "./dto/update-tast-status.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";

@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {
  }

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }
  
  @Get("/:id")
  getTaskById(@Param("id") id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.creatTask(createTaskDto);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @Patch("/:id/status")
  updateTask(@Param("id") id: string, @Body() updateTaskStatusDto: UpdateTastStatusDto): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(id, status);
  }

}
