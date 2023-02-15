import { NotificationInMemoryRepository } from '@infra/database/in-memory/notification-in-memory-repository';
import { SendNotificationUseCase } from './send-notification-use-case';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new NotificationInMemoryRepository();

    const sendNotification = new SendNotificationUseCase(
      notificationRepository,
    );

    const { notification } = await sendNotification.execute({
      content: 'Você tem uma nova solicitação de amizade',
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
