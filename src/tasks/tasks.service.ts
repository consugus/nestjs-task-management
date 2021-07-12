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

  // async getTasks(): Promise<Task[]> {
  async getTasks(filterDTO: GetTaskByFilterDTO): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDTO);
  }

  // async getAllTasks(): Promise<Task[]> {
  //   return this.tasksRepository.getTasks(GetTaskByFilterDTO);
  // }

  // getTasksByFilter(filterDTO: GetTaskByFilterDTO): Task[] {
  //   const { status, search } = filterDTO;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task: Task) => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter((task: Task) => {
  //       if (task.description.includes(search) || task.title.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }

  //   return tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id: "${id}" doesn't exist`);
    }
    return found;
  }

  createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDTO, user);
  }

  async updateTask(id: string, status: TaskStatus): Promise<Task> {
    const found = await this.getTaskById(id);
    if (!found) {
      throw new NotFoundException(`Task with id: "${id}" doesn't exist`);
    }
    found.status = status;
    await this.tasksRepository.save(found);
    return found;
  }

  async deleteTask(id: string): Promise<Record<string, unknown>> {
    const deleted = await this.tasksRepository.delete(id);
    if (!deleted.affected) {
      throw new NotFoundException(`Task with id: "${id}" doesn't exist`);
    }
    return {
      statusCode: 404,
      message: `task ${id} successfully deleted`,
    };
  }
}
