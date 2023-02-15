import { NotificationInMemoryRepository } from '@infra/database/in-memory/notification-in-memory-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { NotificationNotFound } from './errors/notification-error';
import { ReadNotificationUseCase } from './read-notification-use-case';

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const readNotificationUseCase = new ReadNotificationUseCase(
      notificationRepository,
    );

    const notification = makeNotification();
    await notificationRepository.create(notification);

    await readNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not to be able to read a non existing notification', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const readNotificationUseCase = new ReadNotificationUseCase(
      notificationRepository,
    );

    expect(() => {
      return readNotificationUseCase.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
