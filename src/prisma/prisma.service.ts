import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

// Evita cualquier edge con ESM/ts-node en Windows/Node 22:
const { PrismaClient } = require('@prisma/client');

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
