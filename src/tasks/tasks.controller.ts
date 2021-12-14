import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { UpdateTastStatusDto } from "./dto/update-tast-status.dto";

@Controller('tasks')
export class TasksController {
  constructor(private taskService:TasksService) {}
  @Get()
  getTasks(@Query() filterDto:GetTaskFilterDto): Task[]{
    // if we have any filters defined , call taskService.getTaskWithFilters
    if (Object.keys(filterDto).length){
      return this.taskService.getTasksWithFilters(filterDto);
    }
    else{
      // otherwise, just get all tasks
      return this.taskService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id:string):Task{
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.creatTask(createTaskDto);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string): void {
    return this.taskService.deleteTask(id);
  }

  @Patch("/:id/status")
  updateTask(@Param("id") id: string, @Body() updateTaskStatusDto: UpdateTastStatusDto): Task {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTask(id, status);
  }

}
