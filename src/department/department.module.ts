import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentRepository } from './department.repository';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DepartmentRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    AuthenticationModule,
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
