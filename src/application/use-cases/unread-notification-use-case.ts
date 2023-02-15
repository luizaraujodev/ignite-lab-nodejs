import { Injectable } from '@nestjs/common';
import { INotificationRepository } from '../repositories/inotification-repository';
import { NotificationNotFound } from './errors/notification-error';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotificationUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();
    await this.notificationRepository.save(notification);
  }
}
