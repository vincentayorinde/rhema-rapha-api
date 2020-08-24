import { IdentityUserService } from './../authentication/identity-user/identity-user.service';
import { Module } from '@nestjs/common';
import { IdentityUserRepository } from '../authentication/identity-user/identity-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationService } from './service/notification.service';
import { EmailService } from './service/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([IdentityUserRepository])],
  controllers: [],
  providers: [IdentityUserService, NotificationService, EmailService],
  exports: [IdentityUserService, EmailService],
})
export class SharedModule {}
