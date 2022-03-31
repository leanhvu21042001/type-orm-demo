import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name } = createUserDto;
    const user = this.usersRepository.create({ name });
    const userSaved = await this.usersRepository.save(user);
    return userSaved;
  }

  async findAll(): Promise<User[]> {
    const usersFound = await this.usersRepository.find({});
    return usersFound;
  }

  async findOne(id: number): Promise<User> {
    const userFound = await this.usersRepository.findOne(id);
    return userFound;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { name, isActive } = updateUserDto;
    const userFound = await this.findOne(id);
    userFound.name = name;
    userFound.isActive = isActive;
    const userSaved = this.usersRepository.save(userFound);
    return userSaved;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
