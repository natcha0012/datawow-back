import { BlogTag } from 'src/enums/tag.enum';

export type Board = {
  id: number;
  userId: number;
  author: string;
  tag: BlogTag;
  title: string;
  content: string;
  commentIds: number[];
};
