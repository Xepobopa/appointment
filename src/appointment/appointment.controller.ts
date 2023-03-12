import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from "../schema/appointment.schema";

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {}

    @Post('create')
    async create(@Body() appt: Appointment) {
        return await this.appointmentService.create(appt);
    }

    @Get('get')
    async getAll() {
        return await this.appointmentService.getAll();
    }
}
