import { handlers } from '../index';
import taskService from '../../services/task';
import { ETaskPriority } from '../../types/task';
import { Mock } from "jest-mock";

jest.mock('../../services/task', () => ({
  __esModule: true,
  default: {
    createTask: jest.fn(),
    fetchTasks: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  },
}));

describe('Task Actions', () => {
  it('should create a task successfully', async () => {
    const input = {
      title: 'Test Task',
      priority: ETaskPriority.LOW,
      dueDate: '2024-12-31T23:59:59Z',
    };

    (taskService.createTask as Mock<any>).mockResolvedValue({ id: 1, ...input, isCompleted: false });

    const result = await handlers.createTask(input);

    expect(taskService.createTask).toHaveBeenCalledWith(input);
    expect(result?.task).toEqual({ id: 1, ...input, isCompleted: false });
  });

  it('should handle failure in createTask', async () => {
    const input = {
      title: 'Test Task',
      priority: ETaskPriority.LOW,
      dueDate: '2024-12-31T23:59:59Z',
    };

    (taskService.createTask as Mock<any>).mockRejectedValue(new Error('Error creating task'));

    const result = await handlers.createTask(input);

    expect(taskService.createTask).toHaveBeenCalledWith(input);
    expect(result?.error).toBe('Failed to create task');
  });

  it('should fetch tasks successfully', async () => {
    const filters = { priority: ETaskPriority.LOW, isCompleted: 'true' };

    const mockTasks = [
      { id: 1, title: 'Task 1', priority: ETaskPriority.LOW, dueDate: '2024-12-31T23:59:59Z', isCompleted: true },
    ];
    (taskService.fetchTasks as Mock<any>).mockResolvedValue(mockTasks);

    const result = await handlers.fetchTasks({ filters }) ;

    expect(taskService.fetchTasks).toHaveBeenCalledWith({
      where: {
        priority: filters.priority,
        isCompleted: true,
      },
    });
    expect(result.tasks).toEqual(mockTasks);
  });

  it('should handle failure in fetchTasks', async () => {
    (taskService.fetchTasks as Mock<any>).mockRejectedValue(new Error('Error fetching tasks'));

    const result = await handlers.fetchTasks({ filters: {} });

    expect(result?.error).toBe('Failed to fetch tasks');
  });

  it('should update a task successfully', async () => {
    const input = { id: 1, title: 'Updated Task', priority: ETaskPriority.MEDIUM };

    const updatedTask = { ...input, isCompleted: false, id: 1 };
    (taskService.updateTask as Mock<any>).mockResolvedValue(updatedTask);

    const result = await handlers.updateTask(input);

    expect(taskService.updateTask).toHaveBeenCalledWith(1, input);
    expect(result?.task).toEqual(updatedTask);
  });

  it('should delete a task successfully', async () => {
    const input = { id: 1 };

    const deletedTask = { id: 1 };
    (taskService.deleteTask as Mock<any>).mockResolvedValue(deletedTask);

    const result = await handlers.deleteTask(input);

    expect(taskService.deleteTask).toHaveBeenCalledWith(1);
    expect(result?.task).toEqual(deletedTask);
  });
});
