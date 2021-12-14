import { TaskStatus } from "../task.model";
import { IsEnum } from "class-validator";

export class UpdateTastStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;

}
