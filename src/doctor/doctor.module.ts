import { forwardRef, Module } from "@nestjs/common";
import { DoctorController } from "./doctor.controller";
import { DoctorService } from "./doctor.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Doctor, DoctorSchema } from "../schema/doctor.schema";
import { AppointmentModule } from "../appointment/appointment.module";

@Module({
    imports: [
        forwardRef(() => AppointmentModule),
        MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }])
    ],
    controllers: [DoctorController],
    providers: [DoctorService],
    exports: [DoctorService]
})
export class DoctorModule {}