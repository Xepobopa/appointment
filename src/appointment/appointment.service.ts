import {forwardRef, HttpException, HttpStatus, Inject, Injectable, Logger} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Appointment, AppointmentDocument, AppointmentSchema} from "../schema/appointment.schema";
import {Model} from "mongoose";
import * as mongoose from "mongoose";
import {AppointmentException} from "../exception/appointment.exception";
import {randomUUID} from "crypto";
import {ScheduleService} from "../schedule/schedule.service";
import {UserService} from "../user/user.service";
import {DoctorService} from "../doctor/doctor.service";


@Injectable()
export class AppointmentService {
    constructor(
        @InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>,
        private scheduleService: ScheduleService,
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        @Inject(forwardRef(() => DoctorService))
        private doctorService: DoctorService,
    ) {}
    private logger = new Logger();

    async create(appt: Appointment) {
        const uniqueAppt = await this.appointmentModel.findOne({
            user: new mongoose.Types.ObjectId(appt.user),
            doctor: new mongoose.Types.ObjectId(appt.doctor)
        });
        if (uniqueAppt) {
            throw new AppointmentException("Can't create new appointment, because user already has an appointment to this doctor")
        }

        const appts_date = (await this.appointmentModel.find(
                {doctor: new mongoose.Types.ObjectId(appt.doctor)})
        ).map(val => val.expiresAt.toLocaleDateString() === new Date().toLocaleDateString());
        if (appts_date.length >= 3) {
            throw new AppointmentException("Can't create new appointment, because this doctor already has 3 appointments")
        }

        const payload = {
            ...appt,
            user: new mongoose.Types.ObjectId(appt.user),
            doctor: new mongoose.Types.ObjectId(appt.doctor),
            date: new Date(Date.now() + Number.parseInt(process.env.TTLSEC) * 1000)
        }

        const new_appt: Appointment = (await this.appointmentModel.create(payload)).toObject({ versionKey: false });

        const doctor = await this.doctorService.getById(new_appt.doctor);
        const user = await this.userService.getById(new_appt.user);
        console.log(doctor);
        console.log(user);
        await this.scheduleService.addCronJob(randomUUID(), 50, new_appt.expiresAt, doctor.spec, user.name);
        await this.scheduleService.addCronJob(randomUUID(), 80, new_appt.expiresAt, doctor.spec, user.name)

        return new_appt;
    }

    async getAll() {
        return (await this.appointmentModel.find()).map(appt => {
            const object = appt.toObject({versionKey: false});
            return {...object, date: `${object.expiresAt.toLocaleString()}`}
        });
    }

    async getByUserId(id: string) {
        const appt = await this.appointmentModel.find({ user: id });
        if (!appt.length) {
            throw new AppointmentException('Can\'t find appointment!')
        }
        return appt;
    }

    async getByDoctorId(id: string) {
        return (await this.appointmentModel.find({doctor: new mongoose.Types.ObjectId(id)})).map(appt => {
            if (!appt) {
                throw new AppointmentException('Can\'t find appointment!')
            }
            const object = appt.toObject({versionKey: false});
            return {...object, date: `${object.expiresAt.toLocaleString()}`}
        });
    }

    async getById(id: string) {
        const appt = await this.appointmentModel.findById(id);
        if (!appt) {
            throw new AppointmentException('Can\'t find appointment!')
        }
        return appt;
    }
}
