import {Injectable, Logger} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Appointment, AppointmentDocument} from "../schema/appointment.schema";
import {Model} from "mongoose";
import * as mongoose from "mongoose";
import {randomUUID} from "crypto";
import {ScheduleService} from "../schedule/schedule.service";
import {UserService} from "../user/user.service";
import {DoctorService} from "../doctor/doctor.service";
import {ConfigService} from "@nestjs/config";
import {AppointmentException} from "../exception/appointment.exception";
import { AppointmentDto } from "../dto/appointment.dto";


@Injectable()
export class AppointmentService {
    constructor(
        @InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>,
        private scheduleService: ScheduleService,
        private configService: ConfigService,
        private doctorService: DoctorService,
        private userService: UserService,
    ) {}
    private logger = new Logger();

    async create(appt: AppointmentDto) {
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
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + (this.configService.get<number>('TTLSEC') * 1000))
        }

        const new_appt: Appointment = await this.appointmentModel.create(payload);

        const doctor = await this.doctorService.getById(new_appt.doctor);
        const user = await this.userService.getById(new_appt.user);
        await this.scheduleService.addCronJob(randomUUID(), 50, new_appt.expiresAt, doctor.spec, user.name);
        await this.scheduleService.addCronJob(randomUUID(), 80, new_appt.expiresAt, doctor.spec, user.name)

        return new_appt;
    }

    async activate(id: string) {
        const appt = await this.getApptById(id);
        if (appt.activate) {
            throw new AppointmentException('Appointment has already activated');
        }
        appt.activate = true;
        return await appt.save();
    }

    async getAll() {
        return (await this.appointmentModel.find().orFail(new Error('No appointments found!')));
    }

    async getByUserId(id: string) {
        return this.appointmentModel.find({ user: new mongoose.Types.ObjectId(id) }).orFail(new Error('No appointments found!'));
    }

    async getByDoctorId(id: string) {
        return this.appointmentModel.find({ doctor: new mongoose.Types.ObjectId(id) }).orFail(new Error('No appointments found!'));
    }

    async getApptById(id: string) {
        return this.appointmentModel.findById(id).orFail(new Error('Can\'t find appointment by id'));
    }
}
