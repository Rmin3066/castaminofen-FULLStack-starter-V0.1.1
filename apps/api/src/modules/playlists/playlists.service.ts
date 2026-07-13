import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePlaylistDto) {
    return this.prisma.playlist.create({ data: dto });
  }

  findByUser(userId: string) {
    return this.prisma.playlist.findMany({ where: { userId } });
  }

  async update(id: string, dto: UpdatePlaylistDto) {
    const playlist = await this.prisma.playlist.findUnique({ where: { id } });
    if (!playlist) throw new NotFoundException('Playlist not found');
    return this.prisma.playlist.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.prisma.playlist.delete({ where: { id } });
    return { deleted: true };
  }
}
