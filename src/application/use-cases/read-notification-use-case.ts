import { Injectable } from '@nestjs/common';
import { INotificationRepository } from '../repositories/inotification-repository';
import { NotificationNotFound } from './errors/notification-error';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotificationUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();
    await this.notificationRepository.save(notification);
  }
}
