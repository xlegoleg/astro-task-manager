import { defineAction } from 'astro:actions';
import { z } from 'zod';
import taskService from '../services/task';
import { ETaskPriority, ITask } from '../types/task';

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.enum([
      ETaskPriority.LOW,
      ETaskPriority.MEDIUM,
      ETaskPriority.HIGHT
  ]).transform(val => val as ETaskPriority),
  dueDate: z.string().datetime(),
});

export const handlers = {
  createTask: async (input: Omit<ITask, 'id' | 'isCompleted'>) => {
    try {
      const task = await taskService.createTask(input);
      return { task };
    } catch (error) {
      return { error: 'Failed to create task' };
    }
  },
  fetchTasks: async ({ filters }: { filters: { priority?: string; isCompleted?: string } }) => {
    try {
      let tasks = await taskService.fetchTasks({
        where: {
          ...(filters.priority && { priority: filters.priority }),
          ...(filters.isCompleted && { isCompleted: !!filters.isCompleted }),
        },
      });

      return { tasks };
    } catch (error) {
      return { error: 'Failed to fetch tasks' };
    }
  },
  updateTask: async (input: Partial<ITask>) => {
    try {
      const updatedTask = await taskService.updateTask(input.id!, input);
      return { task: updatedTask };
    } catch (error) {
      return { error: 'Failed to update task' };
    }
  },
  deleteTask: async (input: Partial<ITask>) => {
    try {
      const task = await taskService.deleteTask(input.id!);
      return { task };
    } catch (error) {
      return { error: 'Failed to delete task' };
    }
  },
}

export const server = {
  createTask: defineAction({
    input: taskSchema,
    handler: handlers.createTask,
  }),

  fetchTasks: defineAction({
    handler: handlers.fetchTasks,
  }),

  updateTask: defineAction({
    input: z.object({
      id: z.number(),
      title: z.string().optional(),
      description: z.string().optional(),
      priority: z.enum([
        ETaskPriority.LOW,
        ETaskPriority.MEDIUM,
        ETaskPriority.HIGHT
      ]).optional(),
      dueDate: z.string().datetime().optional(),
      isCompleted: z.boolean().optional(),
    }),
    handler: handlers.updateTask,
  }),

  deleteTask: defineAction({
    input: z.object({
      id: z.number(),
    }),
    handler: handlers.deleteTask,
  })
};
