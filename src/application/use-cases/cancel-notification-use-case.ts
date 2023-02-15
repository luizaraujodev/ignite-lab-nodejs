import { Injectable } from '@nestjs/common';
import { INotificationRepository } from '../repositories/inotification-repository';
import { NotificationNotFound } from './errors/notification-error';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotificationUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();
    await this.notificationRepository.save(notification);
  }
}
