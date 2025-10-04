import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module'; // <-- módulo

@Module({
  imports: [PrismaModule],              // <-- usa el módulo
  controllers: [UsersController],
  providers: [UsersService],            // <-- quita PrismaService de aquí
})
export class UsersModule {}
