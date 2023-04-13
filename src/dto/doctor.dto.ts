import {IsBoolean, IsEmail, IsNotEmpty, IsPhoneNumber, IsString} from "class-validator";

export class DoctorDto {
    @IsNotEmpty({ message: 'Email should be not empty' })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'Photo avatar should be not empty' })
    @IsString()
    photo_avatar: string;

    @IsNotEmpty({ message: 'Phone number should be not empty' })
    @IsPhoneNumber()
    phone: string;

    @IsNotEmpty({ message: 'Name should be not empty' })
    @IsString()
    name: string;

    @IsNotEmpty({ message: 'Type should be not empty' })
    @IsString()
    type: string;

    @IsNotEmpty({ message: 'Spec should be not empty' })
    @IsString()
    spec: string;

    @IsNotEmpty({ message: 'IsFree should be not empty' })
    @IsBoolean()
    free: boolean;
}