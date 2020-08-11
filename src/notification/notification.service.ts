import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { User } from 'src/authentication/auth-guard/current-user.decorator';

@Injectable()
export class NotificationService {
  @Cron(CronExpression.EVERY_10_SECONDS)
  public sendNotificationEmail(@User user: date) {}

  sendEmail() {}

  calculateAppointmentTime() {}
}
