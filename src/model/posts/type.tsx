export type PostType = {
  id: string;
  createdAt: number;
  updatedAt: number;
  userId: string;
  title: string;
  slug: string;
  body: string;
  image: string;
};

export type PostTypeWritable = Omit<Omit<Omit<PostType, 'id'>, 'createdAt'>, 'updatedAt'>;
