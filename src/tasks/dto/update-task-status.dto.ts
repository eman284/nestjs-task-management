import { TaskStatus } from "../task-status.enum";
import { IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  @ApiProperty()
  status: TaskStatus;

}
