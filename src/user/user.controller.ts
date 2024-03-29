import {Body, Controller, Delete, Get, Param, Post, UsePipes} from "@nestjs/common";
import { UserService } from "./user.service";
import { IdValidationPipe } from "../pipe/id-validation.pipe";
import {IsNotEmpty} from "class-validator";
import {UserDto} from "../dto/user.dto";

class TestDto {
    @IsNotEmpty()
    var: number;
}

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post('create')
    async writeUser(@Body() user: UserDto) {
        return await this.userService.writeUser(user);
    }

    @Get('get')
    async getAll() {
        return await this.userService.getAllUsers();
    }

    @UsePipes(IdValidationPipe)
    @Get('get/:id')
    async getUserById(@Param('id') id: string) {
        return await this.userService.getById(id);
    }

    @Delete('delete/:id')
    @UsePipes(IdValidationPipe)
    async deleteOne(@Param('id') id: string) {
        return await this.userService.deleteOne(id);
    }
}