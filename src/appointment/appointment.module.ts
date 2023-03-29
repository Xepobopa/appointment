import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Appointment, AppointmentSchema } from "../schema/appointment.schema";
import { ScheduleModule } from "../schedule/schedule.module";
import { DoctorModule } from "../doctor/doctor.module";
import { UserModule } from "../user/user.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      ScheduleModule,
      ConfigModule,
      DoctorModule,
      UserModule,
      MongooseModule.forFeature([{ name: Appointment.name, schema: AppointmentSchema }])
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [AppointmentService]
})
export class AppointmentModule {}
