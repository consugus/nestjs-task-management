import {
  Controller,
  Body,
  Param,
  Query,
  Get,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { GetTaskByFilterDTO } from './dtos/get-task-filter.dto';
import { UpdateTaskStatusDTO } from './dtos/update-taskStatus.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async getTasks(@Query() filterDTO: GetTaskByFilterDTO): Promise<Task[]> {
    return this.taskService.getTasks(filterDTO);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskService.createTask(createTaskDTO);
  }

  @Put('/:id/status')
  async updateTAsk(
    @Param('id') id: string,
    @Body() { status }: UpdateTaskStatusDTO,
  ): Promise<Task> {
    return this.taskService.updateTask(id, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
