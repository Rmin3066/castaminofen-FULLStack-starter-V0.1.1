import { Controller, Get, Query } from '@nestjs/common';

@Controller('search')
export class SearchController {
  @Get()
  search(@Query('q') query: string) {
    return {
      query: query ?? '',
      results: [],
    };
  }
}
