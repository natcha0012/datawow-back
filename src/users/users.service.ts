import { Injectable } from '@nestjs/common';
import { users } from 'src/database';
import { User } from 'src/entitities';

@Injectable()
export class UsersService {
  findOne(username: string): User {
    return users.find((user) => user.username === username);
  }

  createUser(username: string): User {
    const length = users.length;
    const lastIndex = length === 0 ? 1 : users[length - 1].id;
    const body: User = {
      id: lastIndex + 1,
      username,
    };

    users.push(body);
    return body;
  }
}
