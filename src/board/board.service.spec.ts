// import { Test, TestingModule } from '@nestjs/testing';
// import { BoardService } from './board.service';
// import { UnauthorizedException } from '@nestjs/common';
// import { boards } from '../database';
// import { CreateBoardDto } from './dto/create-board.dto';
// import { UpdateBoardDto } from './dto/update-board.dto';

// describe('BoardService', () => {
//   let service: BoardService;

//   beforeEach(async () => {
//     boards.length = 0; // reset mock database

//     const module: TestingModule = await Test.createTestingModule({
//       providers: [BoardService],
//     }).compile();

//     service = module.get<BoardService>(BoardService);
//   });

//   it('should create a board', () => {
//     const dto: CreateBoardDto = {
//       title: 'Test Detail',
//     };
//     const result = service.create(dto, 1);

//     expect(result).toMatchObject({
//       id: 2,
//       title: 'Test Detail',
//       userId: 1,
//       commentId: [],
//     });
//     expect(boards.length).toBe(1);
//   });

//   it('should return all boards', () => {
//     service.create({ title: 'Detail' }, 1);
//     const result = service.findAll();
//     expect(result.length).toBe(1);
//   });

//   it('should find one board by id', () => {
//     const created = service.create({ title: 'Detail' }, 1);
//     const result = service.findOne(created.id);
//     expect(result).toEqual(created);
//   });

//   it('should update a board if userId matches', () => {
//     const created = service.create({ title: 'Detail' }, 1);
//     const dto: UpdateBoardDto = { title: 'Updated Detail' };

//     const result = service.update(created.id, dto, 1);
//     expect(result).toBe(`This action updates a #${created.id} board`);
//     expect(boards[0].title).toBe('Updated Detail');
//   });

//   it('should throw UnauthorizedException if update userId does not match', () => {
//     const created = service.create({ title: 'Detail' }, 1);
//     const dto: UpdateBoardDto = { title: 'Hacked Detail' };

//     expect(() => service.update(created.id, dto, 2)).toThrow(
//       UnauthorizedException,
//     );
//   });

//   it('should remove a board if userId matches', () => {
//     const created = service.create({ title: 'Detail' }, 1);
//     const result = service.remove(created.id, 1);

//     expect(result).toBe(`This action removes a #${created.id} board`);
//     expect(boards.length).toBe(0);
//   });

//   it('should throw UnauthorizedException if remove userId does not match', () => {
//     const created = service.create({ title: 'Detail' }, 1);
//     expect(() => service.remove(created.id, 2)).toThrow(UnauthorizedException);
//   });
// });
