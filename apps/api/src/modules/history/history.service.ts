import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateHistoryDto } from './dto/create-history.dto';

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateHistoryDto) {
    return this.prisma.listeningHistory.create({ data: dto });
  }

  findByUser(userId: string) {
    return this.prisma.listeningHistory.findMany({ where: { userId } });
  }

  async remove(id: string) {
    const entry = await this.prisma.listeningHistory.findUnique({ where: { id } });
    if (!entry) throw new NotFoundException('History entry not found');
    await this.prisma.listeningHistory.delete({ where: { id } });
    return { deleted: true };
  }
}
