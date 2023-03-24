import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {IsEmail, IsNotEmpty, IsPhoneNumber} from "class-validator";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ type: String, default: 'harry.sutton@example.com' })
    @IsNotEmpty({ message: 'Email should be not empty' })
    @IsEmail()
    email: string;

    @Prop({ type: String })
    @IsNotEmpty({ message: 'Photo avatar should be not empty' })
    photo_avatar: string;

    @Prop({ type: String, default: '(743) 805-2841' })
    @IsNotEmpty({ message: 'Email should be not empty' })
    @IsPhoneNumber()
    phone: string;

    @Prop({ type: String, default: 'Summer Smith' })
    @IsNotEmpty({ message: 'Phone number should be not empty' })
    name: string;

    @Prop({ type: String, default: 'therapist' })
    @IsNotEmpty({ message: 'User type should be not empty' })
    type: string;

    // @Prop({ type: [String] })
    // appointments: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);