import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Schema } from 'mongoose';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: Schema.Types.ObjectId) {
    return `This action returns a #${id} user`;
  }

  update(id: Schema.Types.ObjectId, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: Schema.Types.ObjectId) {
    return `This action removes a #${id} user`;
  }
}
