import {IsDataURI, IsEmail, IsNotEmpty, IsPhoneNumber, IsUrl} from "class-validator";

export class UserDto {
    @IsNotEmpty({ message: 'Email should be not empty' })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'Photo avatar should be not empty' })
    @IsUrl()
    photo_avatar: string;

    @IsNotEmpty({ message: 'Phone number should be not empty' })
    @IsPhoneNumber()
    phone: string;

    @IsNotEmpty({ message: 'Name should be not empty' })
    name: string;

    @IsNotEmpty({ message: 'User type should be not empty' })
    type: string;
}