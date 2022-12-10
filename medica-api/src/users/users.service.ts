import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUserDao = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name
      }
    }).catch((error: any) => {
      console.error(error)
      throw new Error('Error UsersService create')
    });
    return new User(createUserDao);
  }

  async findAll(): Promise<User[]> {
    const users: User[] = []
    const usersDao = await this.prisma.user.findMany({})
      .catch((error: any) => {
        console.error(error)
        throw new Error('Error UsersService findAll')
      });

    for (const userDao of usersDao) {
      users.push(new User(userDao))
    }

    return users;
  }

  async findOne(id: number): Promise<User> {
    const userDao = await this.prisma.user.findFirstOrThrow({
      where: {
        id: id
      }
    }).catch((error: any) => {
      console.error(error);
      throw new Error(`Error UsersService findOne with id:${id}`);
    });
    return new User(userDao);

  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.prisma.user.update({
      where: {
        id: id
      }, data: {
        name: updateUserDto.name,
        email: updateUserDto.email
      }
    }).catch(err => {
      console.error(err)
      throw new Error(`Error UsersService update id:${id}`)
    });
    return this.findOne(+id)
  }

  async remove(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: id
      }
    }).catch(err => {
      console.error(err)
      throw new Error(`Error UsersService remove id:${id}`)
    });
  }
}
