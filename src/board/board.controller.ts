import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UserData } from 'src/decorator/user.decorator';
import { User } from 'src/entitities';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createBoardDto: CreateBoardDto, @UserData() user: User) {
    return this.boardService.create(createBoardDto, user);
  }

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBoardDto: CreateBoardDto,
    @UserData() user: User,
  ) {
    return this.boardService.update(+id, updateBoardDto, user.id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @UserData() user: User) {
    return this.boardService.remove(+id, user.id);
  }
}
