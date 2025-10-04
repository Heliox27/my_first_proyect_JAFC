import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password, // para demo; si quieres luego lo hasheamos
        tenantId: dto.tenantId,
        ...(dto.firstName || dto.lastName
          ? { profile: { create: { firstName: dto.firstName ?? '', lastName: dto.lastName ?? '' } } }
          : {}),
      },
      include: { tenant: true, profile: true },
    });
  }

  findAll() {
    return this.prisma.user.findMany({ include: { tenant: true, profile: true } });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { tenant: true, profile: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  update(id: number, dto: UpdateUserDto) {
    const { firstName, lastName, ...userFields } = dto;
    return this.prisma.user.update({
      where: { id },
      data: userFields, // mantenemos simple, perfil aparte si hace falta
      include: { tenant: true, profile: true },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
