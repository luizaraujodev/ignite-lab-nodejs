import { NotificationInMemoryRepository } from '@infra/database/in-memory/notification-in-memory-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { NotificationNotFound } from './errors/notification-error';
import { UnreadNotificationUseCase } from './unread-notification-use-case';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const unreadNotificationUseCase = new UnreadNotificationUseCase(
      notificationRepository,
    );

    const notification = makeNotification({ readAt: new Date() });
    await notificationRepository.create(notification);

    await unreadNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('should not to be able to unread a non existing notification', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const readNotificationUseCase = new UnreadNotificationUseCase(
      notificationRepository,
    );

    expect(() => {
      return readNotificationUseCase.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
