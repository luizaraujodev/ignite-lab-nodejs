import { INotificationRepository } from '@application/repositories/inotification-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notification-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: INotificationRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [INotificationRepository],
})
export class DatabaseModule {}
