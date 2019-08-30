export type NotificationType = {
  id: string;
  createdAt: number;
  updatedAt: number;
  userId: string;
  to: string;
  unread: boolean;
  icon: string;
  iconTitle: string; // for notifications without an icon
  text: string;
};

export type NotificationTypeWritable = Omit<
  Omit<Omit<NotificationType, 'id'>, 'createdAt'>,
  'updatedAt'
>;
