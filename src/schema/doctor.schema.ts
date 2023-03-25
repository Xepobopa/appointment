import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {IsBoolean, IsEmail, IsNotEmpty, IsPhoneNumber} from "class-validator";

export type DoctorDocument = HydratedDocument<Doctor>;

@Schema()
export class Doctor {
    @Prop({ type: String, default: 'harry.sutton@example.com' })
    email: string;

    @Prop({ type: String })
    photo_avatar: string;

    @Prop({ type: String, default: '(743) 805-2841' })
    phone: string;

    @Prop({ type: String, default: 'Summer Smith' })
    name: string;

    @Prop({ type: String, default: 'therapist' })
    type: string;

    @Prop({ type: String })
    spec: string;

    @Prop({ type: Boolean })
    free: boolean;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);