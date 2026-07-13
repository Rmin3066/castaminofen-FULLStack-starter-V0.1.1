import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Injectable()
export class EpisodesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEpisodeDto) {
    return this.prisma.episode.create({ data: dto });
  }

  findAll() {
    return this.prisma.episode.findMany();
  }

  async findOne(id: string) {
    const episode = await this.prisma.episode.findUnique({ where: { id } });
    if (!episode) throw new NotFoundException('Episode not found');
    return episode;
  }

  async update(id: string, dto: UpdateEpisodeDto) {
    return this.prisma.episode.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.prisma.episode.delete({ where: { id } });
    return { deleted: true };
  }
}
