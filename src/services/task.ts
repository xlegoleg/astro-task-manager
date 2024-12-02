import { type ITask, type ETaskPriority } from '../types/task';
import DBService from './db';
import { z } from 'zod';
import { Prisma } from "@prisma/client";

const db = DBService.getInstance().getClient();

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).transform(val => val as ETaskPriority),
  dueDate: z.string().datetime(),
  isCompleted: z.boolean().optional(),
});

class TaskService {
  async createTask(data: Omit<ITask, 'id' | 'isCompleted'>): Promise<ITask> {
    const parsedData = taskSchema.parse(data);

    const taskData: Omit<ITask, 'id' | 'isCompleted'> = {
      title: parsedData.title,
      description: parsedData.description,
      priority: parsedData.priority,
      dueDate: parsedData.dueDate,
    };

    const task = await db.task.create({
      data: { ...taskData, isCompleted: false },
    });

    return task as unknown as ITask;
  }
  async fetchTasks(params: Prisma.TaskFindManyArgs): Promise<ITask[]> {
    return db.task.findMany(params) as unknown as ITask[];
  }

  async updateTask(id: number, data: Partial<Omit<ITask, 'id'>>): Promise<ITask> {
    if (data) {
      const validatedData = taskSchema.partial().parse(data);
      return db.task.update({ where: { id }, data: validatedData }) as unknown as ITask;
    }
    throw new Error('No data provided for update');
  }

  async deleteTask(id: number): Promise<ITask> {
    return db.task.delete({ where: { id } }) as unknown as ITask;
  }
}

const taskService = new TaskService();
export default taskService;
