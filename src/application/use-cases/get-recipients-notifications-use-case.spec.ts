import { NotificationInMemoryRepository } from '@infra/database/in-memory/notification-in-memory-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientsNotificationsUseCase } from './get-recipients-notifications-use-case';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications by recipientId', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const getRecipientsNotificationsRequest =
      new GetRecipientsNotificationsUseCase(notificationRepository);

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { notifications } = await getRecipientsNotificationsRequest.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
