import {Body, Controller, Get, Param, Post, UsePipes} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from "../schema/appointment.schema";
import {IdValidationPipe} from "../pipe/id-validation.pipe";
import {UserService} from "../user/user.service";
import {DoctorService} from "../doctor/doctor.service";
import {AppointmentDto} from "../dto/appointment.dto";

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService,
                private readonly userService: UserService,
                private readonly doctorService: DoctorService) {}

    @Post('create')
    async create(@Body() appt: AppointmentDto) {
        return await this.appointmentService.create(appt);
    }

    @Get('get')
    async getAll() {
        return await this.appointmentService.getAll();
    }

    @Get('getUserAppts/:id')
    @UsePipes(IdValidationPipe)
    async getAppts(@Param('id') id: string) {
        return await this.appointmentService.getByUserId(id);
    }

    @Get('getDoctorAppts/:id')
    @UsePipes(IdValidationPipe)
    async getAppt(@Param('id') id: string) {
        return await this.appointmentService.getByDoctorId(id);
    }

    @Get('activateAppt/:id')
    @UsePipes(IdValidationPipe)
    async activate(@Param('id') id: string) {
        return await this.appointmentService.activate(id);
    }
}
