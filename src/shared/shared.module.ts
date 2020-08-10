import { IdentityUserService } from './../authentication/identity-user/identity-user.service';
import { Module } from '@nestjs/common';
import { IdentityUserRepository } from '../authentication/identity-user/identity-user.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [IdentityUserService, IdentityUserRepository],
  exports: [IdentityUserService],
})
export class SharedModule {}
