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
    constructor(@InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>) {
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

    async deleteOne(id: string) {
        return this.doctorModel.findByIdAndDelete(new mongoose.Types.ObjectId(id))
    }
}