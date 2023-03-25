import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Doctor, DoctorDocument } from "../schema/doctor.schema";
import { AppointmentService } from "../appointment/appointment.service";
import { AppointmentDocument } from "../schema/appointment.schema";
import { AppointmentException } from "../exception/appointment.exception";
import mongoose from "mongoose";
import {DoctorDto} from "../dto/doctor.dto";

@Injectable()
export class DoctorService {
    constructor(@InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>) {
    }

    async create(payload: DoctorDto) {
        return (await this.doctorModel.create(payload)).toObject({ versionKey: false });
    }

    async getAll() {
        return (await this.doctorModel.find()).map(doctor =>
            doctor.toObject({ versionKey: false })
        );
    }

    async getById(id: string) {
        return this.doctorModel.findById(new mongoose.Types.ObjectId(id))
            .orFail(new Error(`Doctor with id: '${id}' has not found`));
    }

    async deleteOne(id: string) {
        return this.doctorModel.findByIdAndDelete(new mongoose.Types.ObjectId(id))
            .orFail(new Error(`Doctor with id: '${id}' has not found`))
    }
}