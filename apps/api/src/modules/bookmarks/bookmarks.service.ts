import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@Injectable()
export class BookmarksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBookmarkDto) {
    return this.prisma.bookmark.create({ data: dto });
  }

  findByUser(userId: string) {
    return this.prisma.bookmark.findMany({ where: { userId } });
  }

  async remove(id: string) {
    const bookmark = await this.prisma.bookmark.findUnique({ where: { id } });
    if (!bookmark) throw new NotFoundException('Bookmark not found');
    await this.prisma.bookmark.delete({ where: { id } });
    return { deleted: true };
  }
}
