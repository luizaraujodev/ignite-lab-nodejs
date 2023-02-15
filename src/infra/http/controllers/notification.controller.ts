import { CancelNotificationUseCase } from '@application/use-cases/cancel-notification-use-case';
import { CountRecipientNotificationsUseCase } from '@application/use-cases/count-recipient-notifications-use-case';
import { GetRecipientsNotificationsUseCase } from '@application/use-cases/get-recipients-notifications-use-case';
import { ReadNotificationUseCase } from '@application/use-cases/read-notification-use-case';
import { SendNotificationUseCase } from '@application/use-cases/send-notification-use-case';
import { UnreadNotificationUseCase } from '@application/use-cases/unread-notification-use-case';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationController {
  constructor(
    private sendNotificationUseCase: SendNotificationUseCase,
    private cancelNotificationUseCase: CancelNotificationUseCase,
    private readNotificationUseCase: ReadNotificationUseCase,
    private unreadNotificationUseCase: UnreadNotificationUseCase,
    private countRecipientNotificationsUseCase: CountRecipientNotificationsUseCase,
    private getRecipientNotificationsUseCase: GetRecipientsNotificationsUseCase,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    return await this.cancelNotificationUseCase.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotificationsUseCase.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } =
      await this.getRecipientNotificationsUseCase.execute({
        recipientId,
      });

    return { notifications };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    return await this.readNotificationUseCase.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    return await this.unreadNotificationUseCase.execute({ notificationId: id });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      recipientId,
      category,
      content,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
