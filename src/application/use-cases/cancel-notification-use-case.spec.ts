import { NotificationInMemoryRepository } from '@infra/database/in-memory/notification-in-memory-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { CancelNotificationUseCase } from './cancel-notification-use-case';
import { NotificationNotFound } from './errors/notification-error';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationRepository,
    );

    const notification = makeNotification();
    await notificationRepository.create(notification);

    await cancelNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not to be able to cancel a non existing notification', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationRepository,
    );

    expect(() => {
      return cancelNotificationUseCase.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
