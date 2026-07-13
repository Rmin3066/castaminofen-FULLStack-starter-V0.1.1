import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  search(query: string) {
    return {
      query,
      results: ['podcasts', 'episodes', 'users'],
    };
  }
}
