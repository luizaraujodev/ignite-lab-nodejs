import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('Você tem uma nova solicitação de amizade'),
    category: 'social',
    recipientId: 'recipient-1',
    ...override,
  });
}
