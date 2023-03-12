import { Body, Controller, Get, Param, Post, UsePipes } from "@nestjs/common";
import { UserService } from "./user.service";
import { IdValidationPipe } from "../pipe/id-validation.pipe";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post('create')
    async writeUser(@Body() user) {
        return await this.userService.writeUser(user);
    }

    @Get('get')
    async getAll() {
        return await this.userService.getAll();
    }

    // @Get('getUser/:id')
    // @UsePipes(IdValidationPipe)
    // async getOne(@Param('id') id: string) {
    //     return await this.userService.getById(id);
    // }

    @Get('getAppts/:id')
    @UsePipes(IdValidationPipe)
    async getAppt(@Param('id') id: string) {
        return await this.userService.getAppt(id);
    }
}