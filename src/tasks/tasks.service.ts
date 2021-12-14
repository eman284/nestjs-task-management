import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import { v4 as uuid } from "uuid";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    // define a temporary  array to hold the result
    let tasks = this.getAllTasks();

    // do something with status
    if (status) {
      tasks = tasks.filter((task => task.status === status));
    }

    // do something with search
    if (search) {
      tasks = tasks.filter((task) => {
        return task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search);
      });
    }
    // return final result
    return tasks;
  }

  getTaskById(id: string): Task {
    /*
     try to get task
     if not found, throw an error (404 not found)
     otherwise, return the found task
    */
    const found = this.tasks.find((task => task.id === id));
    if (!found) {
      throw new NotFoundException(`Task not found :(`);
    }
    return found;
  }

  creatTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task => task.id !== found.id));
  }

  updateTask(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
