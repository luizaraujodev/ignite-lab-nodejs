import { CancelNotificationUseCase } from '@application/use-cases/cancel-notification-use-case';
import { CountRecipientNotificationsUseCase } from '@application/use-cases/count-recipient-notifications-use-case';
import { GetRecipientsNotificationsUseCase } from '@application/use-cases/get-recipients-notifications-use-case';
import { ReadNotificationUseCase } from '@application/use-cases/read-notification-use-case';
import { SendNotificationUseCase } from '@application/use-cases/send-notification-use-case';
import { UnreadNotificationUseCase } from '@application/use-cases/unread-notification-use-case';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { NotificationController } from './controllers/notification.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    CountRecipientNotificationsUseCase,
    GetRecipientsNotificationsUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
  ],
  controllers: [NotificationController],
})
export class HttpModule {}
