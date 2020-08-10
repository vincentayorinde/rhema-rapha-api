import { IdentityUserService } from './../authentication/identity-user/identity-user.service';
import { Module } from '@nestjs/common';
import { IdentityUserRepository } from '../authentication/identity-user/identity-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([IdentityUserRepository])],
  controllers: [],
  providers: [IdentityUserService],
  exports: [IdentityUserService],
})
export class SharedModule {}
