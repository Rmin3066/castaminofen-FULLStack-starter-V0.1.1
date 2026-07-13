import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  dashboard() {
    return { message: 'Admin dashboard ready', features: ['users', 'podcasts', 'metrics'] };
  }
}
