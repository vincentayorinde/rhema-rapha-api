import { IdentityUserDto } from './dto/identity-user.dto';
import { IdentityUserRepository } from './identity-user.repository';
import { ResultException } from '../../configuration/exceptions/result';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdentityUserEntity } from './identity-user.entity';

@Injectable()
export class IdentityUserService {
  constructor(
    @InjectRepository(IdentityUserRepository)
    private IdentityUserRepository: IdentityUserRepository,
  ) {}

  public async getUserByEmail(email: string): Promise<IdentityUserEntity> {
    try {
      return await this.IdentityUserRepository.findOne({ email });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getUserById(id: string): Promise<IdentityUserEntity> {
    try {
      return await this.IdentityUserRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAllUser(): Promise<IdentityUserEntity[]> {
    try {
      return await this.IdentityUserRepository.find();
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async createUser(user: IdentityUserDto) {
    try {
      return await this.IdentityUserRepository.save(user);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
