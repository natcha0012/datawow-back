import { BoardService } from './board.service';
import { UnauthorizedException } from '@nestjs/common';
import { boards } from '../database';
import { User } from '../entitities';
import { CreateBoardDto } from './dto/create-board.dto';
import { BlogTag } from 'src/enums/tag.enum';

describe('BoardService', () => {
  let service: BoardService;
  let testUser: User;

  beforeEach(() => {
    service = new BoardService();
    testUser = { id: 1, username: 'testuser' };
    boards.length = 0; // Reset the in-memory DB
  });

  describe('create', () => {
    it('should create a board', () => {
      const dto: CreateBoardDto = {
        title: 'Test Title',
        tag: BlogTag.Exercise,
        content: 'Test content',
      };

      const result = service.create(dto, testUser);

      expect(result).toEqual(
        expect.objectContaining({
          id: 2,
          title: dto.title,
          tag: dto.tag,
          content: dto.content,
          userId: testUser.id,
          author: testUser.username,
          commentIds: [],
        }),
      );

      expect(boards.length).toBe(1);
    });
  });

  describe('findAll', () => {
    it('should return all boards', () => {
      service.create(
        { title: 'A', tag: BlogTag.Fashion, content: 'a' },
        testUser,
      );
      service.create({ title: 'B', tag: BlogTag.Food, content: 'b' }, testUser);
      const result = service.findAll();

      expect(result.length).toBe(2);
    });
  });

  describe('findOne', () => {
    it('should return a single board', () => {
      const created = service.create(
        { title: 'One', tag: BlogTag.Exercise, content: 'one' },
        testUser,
      );
      const result = service.findOne(created.id);

      expect(result.title).toBe('One');
    });
  });

  describe('update', () => {
    it('should update the board if userId matches', () => {
      const created = service.create(
        { title: 'Old', tag: BlogTag.Health, content: 'old' },
        testUser,
      );
      const updated = service.update(
        created.id,
        {
          title: 'New',
          tag: BlogTag.Health,
          content: 'new',
        },
        testUser.id,
      );

      expect(updated).toBe(`This action updates a #${created.id} board`);
      expect(boards[0].title).toBe('New');
    });

    it('should throw UnauthorizedException if userId does not match', () => {
      const created = service.create(
        { title: 'Secure', tag: BlogTag.Health, content: 'secure' },
        testUser,
      );
      expect(() =>
        service.update(
          created.id,
          {
            title: 'Hacked',
            tag: BlogTag.Health,
            content: 'hacked',
          },
          999,
        ),
      ).toThrow(UnauthorizedException);
    });
  });

  describe('remove', () => {
    it('should remove the board if userId matches', () => {
      const created = service.create(
        { title: 'Delete Me', tag: BlogTag.Health, content: 'bye' },
        testUser,
      );
      const result = service.remove(created.id, testUser.id);

      expect(result).toBe(`This action removes a #${created.id} board`);
      expect(boards.length).toBe(0);
    });

    it('should throw UnauthorizedException if userId does not match', () => {
      const created = service.create(
        { title: 'Stay', tag: BlogTag.Health, content: 'still here' },
        testUser,
      );

      expect(() => service.remove(created.id, 999)).toThrow(
        UnauthorizedException,
      );
    });
  });
});
