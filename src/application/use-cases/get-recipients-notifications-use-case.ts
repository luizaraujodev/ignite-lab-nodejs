import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notification';
import { INotificationRepository } from '../repositories/inotification-repository';

interface GetRecipientsNotificationsRequest {
  recipientId: string;
}

interface GetRecipientsNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientsNotificationsUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(
    request: GetRecipientsNotificationsRequest,
  ): Promise<GetRecipientsNotificationsResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
