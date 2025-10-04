import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // <-- RUTA CORRECTA

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      include: { tenant: true, profile: true },
    });
  }
}
