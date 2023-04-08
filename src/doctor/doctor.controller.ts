import {Body, Controller, Delete, Get, Param, Post, UsePipes} from "@nestjs/common";
import { DoctorService } from "./doctor.service";
import {IdValidationPipe} from "../pipe/id-validation.pipe";
import {DoctorDto} from "../dto/doctor.dto";

@Controller('doctor')
export class DoctorController {
    constructor(private doctorService: DoctorService) {}

    @Post('create')
    async create(@Body() doctor: DoctorDto) {
        return await this.doctorService.create(doctor);
    }

    @Get('get')
    async getAll() {
        return await this.doctorService.getAll();
    }

    @UsePipes(IdValidationPipe)
    @Delete('delete/:id')
    async deleteOne(@Param('id') id: string) {
        return await this.doctorService.deleteOne(id);
    }
}