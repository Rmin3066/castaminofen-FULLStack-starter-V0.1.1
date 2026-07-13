import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Injectable()
export class ChannelsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateChannelDto) {
    return this.prisma.channel.create({ data: dto });
  }

  findAll() {
    return this.prisma.channel.findMany();
  }

  async findOne(id: string) {
    const channel = await this.prisma.channel.findUnique({ where: { id } });
    if (!channel) throw new NotFoundException('Channel not found');
    return channel;
  }

  async update(id: string, dto: UpdateChannelDto) {
    return this.prisma.channel.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.prisma.channel.delete({ where: { id } });
    return { deleted: true };
  }
}
