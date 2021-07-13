import { Test } from '@nestjs/testing';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
import { NotFoundException } from '@nestjs/common';
import { mockTask, mockUser } from '../mocks/mockTests';

describe('TaskService', () => {
  let taskService: TasksService;
  let taskRepository;

  const mockTaskRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    taskService = await module.get(TasksService);
    taskRepository = await module.get(TasksRepository);
  });

  describe('getTasks', () => {
    test('calls TaskRepository.getTasks( ) and returns the result', async () => {
      taskRepository.getTasks.mockResolvedValue('someValue');
      const result = await taskService.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    test('calls TaskRepository.findOne( ) and returns the result', async () => {
      taskRepository.findOne.mockResolvedValue(mockTask);
      const result = await taskService.getTaskById('testTaskId', mockUser);
      expect(result).toEqual(mockTask);
    });

    test('calls TaskRepository.findOne( ) and handles an error', async () => {
      taskRepository.findOne.mockResolvedValue(null);
      const result = taskService.getTaskById('testTaskId', mockUser);
      expect(result).rejects.toThrow(NotFoundException);
    });
  });
});
