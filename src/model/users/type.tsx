export type UserType = {
  id: string;
  createdAt: number;
  updatedAt: number;
  roles: string;
  email: string;
  password: string;
  handle: string;
  nameGiven: string;
  nameFamily: string;
  recentSearches: string;
  hasImage: boolean;
};

export type UserTypeWritable = Omit<
  Omit<Omit<Omit<UserType, 'id'>, 'createdAt'>, 'updatedAt'>,
  'roles'
>;
