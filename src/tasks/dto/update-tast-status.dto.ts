import { TaskStatus } from "../task-status.enum";
import { IsEnum } from "class-validator";

export class UpdateTastStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;

}
