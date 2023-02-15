import { NotificationInMemoryRepository } from '@infra/database/in-memory/notification-in-memory-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { CountRecipientNotificationsUseCase } from './count-recipient-notifications-use-case';

describe('Count notifications', () => {
  it('should be able to count notifications by recipientId', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const countRecipientNotificationsRequest =
      new CountRecipientNotificationsUseCase(notificationRepository);

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotificationsRequest.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
