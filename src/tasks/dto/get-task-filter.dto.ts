import { TaskStatus } from "../task-status.enum";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  @ApiProperty({ enum: TaskStatus, enumName: "TaskStatus", required: false })
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  search?: string;
}
