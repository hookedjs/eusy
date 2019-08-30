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
  avatar: string;
  recentSearches: string;
};

export type UserTypeWritable = Omit<
  Omit<Omit<Omit<UserType, 'id'>, 'createdAt'>, 'updatedAt'>,
  'roles'
>;
