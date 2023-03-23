import {Module} from '@nestjs/common';
import {DoctorModule} from "./doctor/doctor.module";
import {UserModule} from "./user/user.module";
import {AppointmentModule} from "./appointment/appointment.module";
import {MongooseModule} from "@nestjs/mongoose";
import {ScheduleModule} from "@nestjs/schedule";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [
        DoctorModule,
        UserModule,
        AppointmentModule,
        ConfigModule.forRoot(),
        ScheduleModule.forRoot(),
        MongooseModule.forRootAsync({
           imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('CONNECTION_STRING'),
            }),
            inject: [ConfigService]
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
