import { Controller, Get, Param, Query } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';

@Controller('podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Get()
  findAll() {
    return this.podcastsService.findAll();
  }

  @Get('search')
  search(@Query('q') query: string) {
    return this.podcastsService.search(query ?? '');
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.podcastsService.findBySlug(slug);
  }

  @Get(':slug/episodes')
  getEpisodes(@Param('slug') slug: string) {
    const podcast = this.podcastsService.findBySlug(slug);
    return podcast?.episodes ?? [];
  }
}
