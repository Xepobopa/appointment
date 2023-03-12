import {Module} from '@nestjs/common';
import {DoctorModule} from "./doctor/doctor.module";
import {UserModule} from "./user/user.module";
import {AppointmentModule} from "./appointment/appointment.module";
import {MongooseModule} from "@nestjs/mongoose";
import * as dotenv from "dotenv";
import {ScheduleModule} from "@nestjs/schedule";
dotenv.config();

@Module({
    imports: [
        DoctorModule,
        UserModule,
        AppointmentModule,
        ScheduleModule.forRoot(),
        MongooseModule.forRoot(`${process.env.CONNECTION_STRING}`)
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
