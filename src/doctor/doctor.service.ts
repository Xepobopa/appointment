import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Doctor, DoctorDocument } from "../schema/doctor.schema";
import { AppointmentService } from "../appointment/appointment.service";
import { AppointmentDocument } from "../schema/appointment.schema";
import { AppointmentException } from "../exception/appointment.exception";
import mongoose from "mongoose";

@Injectable()
export class DoctorService {
    constructor(
        @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
        @Inject(forwardRef(() => AppointmentService))
        private appointmentService: AppointmentService,
    ) {
    }

    async create(payload: Doctor) {
        return (await this.doctorModel.create(payload)).toObject({ versionKey: false });
    }

    async getAll() {
        return (await this.doctorModel.find()).map(doctor =>
            doctor.toObject({ versionKey: false })
        );
    }

    async getById(id: string) {
        return this.doctorModel.findById(new mongoose.Types.ObjectId(id));
    }

    async activate(id: string) {
        const appt: AppointmentDocument = await this.appointmentService.getById(id);
        if (!appt) {
            throw new AppointmentException("Can't find appointment by id")
        }
        appt.activate = true;
        return (await appt.save()).toObject({ versionKey: false });
    }

    async getApptById(id: string) {
        const appts = await this.appointmentService.getByDoctorId(id);
        if (!appts) {
            throw new AppointmentException("Can't find appointment by id")
        }
        return appts;
    }
}