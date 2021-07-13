import { User } from 'src/auth/user.entity';
import { Task } from 'src/tasks/task.entity';
import { TaskStatus } from '../tasks/task-status.enum';

export const mockUser: User = {
  id: 'someId',
  userName: 'someUserName',
  email: 'some.email@mail.com',
  password: 'somePassword',
  task: null,
};

export const mockTask: Task = {
  title: 'testTitle',
  description: 'testDescription',
  id: 'testTaskId',
  status: TaskStatus.OPEN,
  user: null,
};
