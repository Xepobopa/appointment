import {IsBoolean, IsDate, IsMongoId, IsNotEmpty} from "class-validator";

export class AppointmentDto {
    //@IsNotEmpty({ message: 'Date should be not empty' })
    @IsDate()
    date: Date = new Date();

    @IsNotEmpty({ message: 'userId should be not empty' })
    @IsMongoId()
    user: string;

    @IsNotEmpty({ message: 'doctorId should be not empty' })
    @IsMongoId()
    doctor: string;

    //@IsNotEmpty({ message: 'IsActivate should be not empty' })
    @IsBoolean()
    activate: boolean = false;
}