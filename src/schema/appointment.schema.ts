import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as mongoose from "mongoose";
import {IsBoolean, IsDate, IsMongoId, IsNotEmpty} from "class-validator";

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema({ timestamps: true })
export class Appointment {
    @Prop(
        raw({
            default: () => new Date(Date.now() + Number.parseInt(process.env.TTLSEC) * 1000),
            expires: 0,
            type: Date,
        }),
    )
    @IsNotEmpty({ message: 'ExpiresAt should be not empty' })
    @IsDate()
    expiresAt: Date;

    @Prop({ type: Date })
    @IsNotEmpty({ message: 'Date should be not empty' })
    @IsDate()
    date: Date

    @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
    @IsNotEmpty({ message: 'userId should be not empty' })
    @IsMongoId()
    user: string;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'Doctor' })
    @IsNotEmpty({ message: 'doctorId should be not empty' })
    @IsMongoId()
    doctor: string;

    @Prop({ type: Boolean })
    @IsNotEmpty({ message: 'IsActivate should be not empty' })
    @IsBoolean()
    activate: boolean;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);