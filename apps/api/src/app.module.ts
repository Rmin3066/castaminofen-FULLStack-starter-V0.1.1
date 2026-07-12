import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PodcastsModule } from './modules/podcasts/podcasts.module';
import { UsersModule } from './modules/users/users.module';
import { SearchModule } from './modules/search/search.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { HomeController } from './modules/home/home.controller';
import { HomeService } from './modules/home/home.service';

@Module({
  imports: [
    AuthModule,
    PodcastsModule,
    UsersModule,
    SearchModule,
    UploadsModule,
    NotificationsModule,
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class AppModule {}
