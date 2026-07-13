import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadsService {
  upload() {
    return { message: 'Upload placeholder', accepted: true };
  }
}
