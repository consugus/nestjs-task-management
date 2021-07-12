import {
  Controller,
  Body,
  Param,
  Query,
  Get,
  Post,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { GetTaskByFilterDTO } from './dtos/get-task-filter.dto';
import { UpdateTaskStatusDTO } from './dtos/update-taskStatus.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
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
  createTask(
    @Body() createTaskDTO: CreateTaskDTO,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDTO, user);
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
