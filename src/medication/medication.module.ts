import { MedicationService } from './medication.service';
import { MedicationController } from './medication.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationRepository } from './medication.repository';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicationRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    AuthenticationModule,
  ],
  controllers: [MedicationController],
  providers: [MedicationService],
})
export class MedicationModule {}
