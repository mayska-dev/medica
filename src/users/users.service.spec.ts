import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDtoType } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  let id: number
  it('create user', async () => {
    const data: CreateUserDtoType = {
      email: 'sarah@mail.fr',
      name: 'sarah'
    }
    const res = await service.create(data)
    expect(res).toBeInstanceOf(User)
    expect(res.email).toBe(data.email)
    expect(res.name).toBe(data.name)
    id = res.id
  });

  it('findAll users', async () => {
    const res = await service.findAll()
    expect(res.length).toBe(1)
    for (const iterator of res) {
      expect(iterator).toBeInstanceOf(User)
      expect(iterator.name).toBe('sarah')
      expect(iterator.email).toBe('sarah@mail.fr')
    }
  });

  it('update user with name', async () => {

    const res = await service.update(id, {
      name: 'update'
    })
    expect(res).toBeInstanceOf(User)
    expect(res.id).toBe(id)
    expect(res.email).toBe('sarah@mail.fr')
    expect(res.name).toBe('update')
  });

  it('update user with email', async () => {

    const res = await service.update(id, {
      email: 'update@update.update'
    })
    expect(res).toBeInstanceOf(User)
    expect(res.id).toBe(id)
    expect(res.email).toBe('update@update.update')
    expect(res.name).toBe('update')
  });

  it('delete user', async () => {
    const res = await service.remove(id)
  });


});
