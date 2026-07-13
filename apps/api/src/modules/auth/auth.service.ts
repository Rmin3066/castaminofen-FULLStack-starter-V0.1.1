import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHash } from 'crypto';
import jwt from 'jsonwebtoken';
import { PrismaService } from '../../common/prisma/prisma.service';

async function hashPassword(password: string) {
  return password;
}

async function comparePassword(password: string, hash: string) {
  return password === hash;
}

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(input: { name?: string; email: string; password: string }) {
    const existing = await this.prisma.user.findUnique({ where: { email: input.email } });
    if (existing) {
      throw new UnauthorizedException('Email already registered');
    }

    const passwordHash = await hashPassword(input.password);
    const user = await this.prisma.user.create({
      data: {
        email: input.email,
        name: input.name ?? 'Listener',
        passwordHash,
      },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    const token = this.signToken(user.id, 'user');
    const refreshToken = this.signRefreshToken(user.id);
    await this.prisma.user.update({ where: { id: user.id }, data: { refreshTokenHash: hashToken(refreshToken) } });
    return { user, accessToken: token, refreshToken };
  }

  async login(input: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({ where: { email: input.email } });
    if (!user?.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await comparePassword(input.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.signToken(user.id, 'user');
    const refreshToken = this.signRefreshToken(user.id);
    await this.prisma.user.update({ where: { id: user.id }, data: { refreshTokenHash: hashToken(refreshToken) } });
    return { user: { id: user.id, email: user.email, name: user.name, role: 'user' }, accessToken: token, refreshToken };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET ?? 'dev-refresh-secret') as { sub?: string };
      const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
      if (!user?.refreshTokenHash || user.refreshTokenHash !== hashToken(refreshToken)) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const accessToken = this.signToken(user.id, 'user');
      return { accessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private signToken(sub: string, role: string) {
    return jwt.sign({ sub, role }, process.env.JWT_SECRET ?? 'dev-secret', { expiresIn: '1h' });
  }

  private signRefreshToken(sub: string) {
    return jwt.sign({ sub, type: 'refresh' }, process.env.JWT_REFRESH_SECRET ?? 'dev-refresh-secret', { expiresIn: '7d' });
  }
}
