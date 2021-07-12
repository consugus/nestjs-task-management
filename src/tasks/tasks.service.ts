import { Injectable, NotFoundException } from '@nestjs/common';
// import { Task, TaskStatus } from './task-status.enum';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { GetTaskByFilterDTO } from './dtos/get-task-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async getTasks(filterDTO: GetTaskByFilterDTO, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDTO, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    // const found = await this.tasksRepository.findOne(id);
    // const found = await this.tasksRepository.findOne({ where: { id, user } });
    const found = await this.tasksRepository.findOne({ id, user });
    if (!found) {
      throw new NotFoundException(`Task with id: "${id}" doesn't exist`);
    }
    return found;
  }

  createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDTO, user);
  }

  async updateTask(id: string, status: TaskStatus, user: User): Promise<Task> {
    const found = await this.getTaskById(id, user);
    if (!found) {
      throw new NotFoundException(`Task with id: "${id}" doesn't exist`);
    }
    found.status = status;
    await this.tasksRepository.save(found);
    return found;
  }

  async deleteTask(id: string, user: User): Promise<Record<string, unknown>> {
    const deleted = await this.tasksRepository.delete({ id, user });
    if (!deleted.affected) {
      throw new NotFoundException(`Task with id: "${id}" doesn't exist`);
    }
    return {
      statusCode: 404,
      message: `task ${id} successfully deleted`,
    };
  }
}
