import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { DoctorService } from "./doctor.service";
import { Doctor } from "../schema/doctor.schema";

@Controller('doctor')
export class DoctorController {
    constructor(private doctorService: DoctorService) {}

    @Post('create')
    async create(@Body() doctor: Doctor) {
        return await this.doctorService.create(doctor);
    }

    @Get('get')
    async getAll() {
        return await this.doctorService.getAll();
    }

    @Get('activate/:id')
    async activate(@Param('id') id: string) {
        return await this.doctorService.activate(id);
    }

    @Get('getAppts/:id')
    async getAppts(@Param('id') id: string) {
        return await this.doctorService.getApptById(id);
    }
}