import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        PrismaService
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  let userId: string
  it('add new user', async () => {
    const addUser = await controller.create({
      name: 'jojo',
      email: 'jojo@jojo.jojo'
    })
    expect(addUser).toBeInstanceOf(User)
    userId = addUser.id.toString()
  });

  it('remove user', async () => {
    await controller.remove(userId)
  });
});
