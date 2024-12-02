import { PrismaClient } from '@prisma/client';

class DBService {
  private static instance: DBService;
  private readonly prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance(): DBService {
    if (!DBService.instance) {
      DBService.instance = new DBService();
    }
    return DBService.instance;
  }

  public getClient(): PrismaClient {
    return this.prisma;
  }
}

export default DBService;