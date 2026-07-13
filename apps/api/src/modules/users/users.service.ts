import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(search?: string) {
    const where = search ? { OR: [{ email: { contains: search } }, { name: { contains: search } }] } : {};
    return this.prisma.user.findMany({
      where,
      select: { id: true, email: true, name: true, createdAt: true },
    });
  }

  async create(dto: CreateUserDto) {
    return this.prisma.user.create({ data: { email: dto.email ?? 'user@example.com', name: dto.name ?? 'User' }, select: { id: true, email: true, name: true, createdAt: true } });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true, email: true, name: true, createdAt: true } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.update({ where: { id }, data: { ...(dto.name ? { name: dto.name } : {}), ...(dto.email ? { email: dto.email } : {}) }, select: { id: true, email: true, name: true, createdAt: true } });
    return user;
  }

  async remove(id: string) {
    await this.prisma.user.delete({ where: { id } });
    return { deleted: true };
  }
}
