import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDTO } from './dtos/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser({
    userName,
    password,
    email,
  }: AuthCredentialDTO): Promise<void> {
    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(password, salt);
    const user = this.create({ userName, password: passwordHashed, email });
    try {
      await this.save(user);
    } catch (err) {
      if (err.code === '23505') {
        console.log('err: ', err);
        // duplicate user name or email
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUsers() {
    return this.find();
  }
}
