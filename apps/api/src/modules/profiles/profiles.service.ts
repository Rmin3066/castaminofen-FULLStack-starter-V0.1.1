import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(userId: string) {
    const profile = await this.prisma.profile.findFirst({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async update(userId: string, dto: UpdateProfileDto) {
    const existing = await this.prisma.profile.findFirst({ where: { userId } });

    if (existing) {
      return this.prisma.profile.update({
        where: { id: existing.id },
        data: { ...(dto.displayName ? { displayName: dto.displayName } : {}), locale: dto.locale ?? 'en' },
      });
    }

    return this.prisma.profile.create({
      data: { userId, ...(dto.displayName ? { displayName: dto.displayName } : {}), locale: dto.locale ?? 'en' },
    });
  }
}
