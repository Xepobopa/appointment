import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {IsBoolean, IsEmail, IsNotEmpty, IsPhoneNumber} from "class-validator";

export type DoctorDocument = HydratedDocument<Doctor>;

@Schema()
export class Doctor {
    @Prop({ type: String, default: 'harry.sutton@example.com' })
    @IsNotEmpty({ message: 'Email should be not empty' })
    @IsEmail()
    email: string;

    @Prop({ type: String })
    @IsNotEmpty({ message: 'Photo avatar should be not empty' })
    photo_avatar: string;

    @Prop({ type: String, default: '(743) 805-2841' })
    @IsNotEmpty({ message: 'Phone number should be not empty' })
    @IsPhoneNumber()
    phone: string;

    @Prop({ type: String, default: 'Summer Smith' })
    @IsNotEmpty({ message: 'Name should be not empty' })
    name: string;

    @Prop({ type: String, default: 'therapist' })
    @IsNotEmpty({ message: 'Type should be not empty' })
    type: string;

    @Prop({ type: String })
    @IsNotEmpty({ message: 'Spec should be not empty' })
    spec: string;

    @Prop({ type: Boolean })
    @IsNotEmpty({ message: 'IsFree should be not empty' })
    @IsBoolean()
    free: boolean;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);