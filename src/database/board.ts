import { Board } from 'src/entitities';
import { BlogTag } from 'src/enums/tag.enum';

export const boards: Board[] = [
  {
    id: 1,
    userId: 1,
    author: 'user1',
    tag: BlogTag.History,
    title: 'blog history',
    content: 'Test contenttest',
    commentIds: [],
  },
];
