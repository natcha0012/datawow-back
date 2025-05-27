import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { boards } from '../database';
import { Board, User } from '../entitities';

@Injectable()
export class BoardService {
  create(input: CreateBoardDto, user: User) {
    const length = boards.length;
    const lastIndex = length === 0 ? 1 : boards[length - 1].id;
    const body: Board = {
      id: lastIndex + 1,
      commentIds: [],
      userId: user.id,
      author: user.username,
      ...input,
    };

    boards.push(body);
    return body;
  }

  findAll() {
    return boards;
  }

  findOne(id: number) {
    return boards.find((b) => b.id === id);
  }

  update(id: number, updateBoardDto: CreateBoardDto, userId: number) {
    const board = boards.find((b) => b.id === id);

    if (userId !== board.userId) {
      throw new UnauthorizedException();
    }
    board.title = updateBoardDto.title;
    board.tag = updateBoardDto.tag;
    board.content = updateBoardDto.content;
    return `This action updates a #${id} board`;
  }

  remove(id: number, userId: number) {
    const index = boards.findIndex((b) => b.id === id);
    if (userId !== boards[index].userId) {
      throw new UnauthorizedException();
    }
    boards.splice(index, 1);
    return `This action removes a #${id} board`;
  }
}
