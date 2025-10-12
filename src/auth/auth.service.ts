import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(email: string, plainPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const isBcryptHash = typeof user.password === 'string' && user.password.startsWith('$2');
    const ok = isBcryptHash
      ? await bcrypt.compare(plainPassword, user.password)
      : user.password === plainPassword;

    return ok ? user : null;
  }

  async login(dto: { email: string; password: string }) {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email, role: 'user' };
    const access_token = await this.jwt.signAsync(payload);
    return { access_token };
  }
}
