import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTaskByFilterDTO {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
