import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as mongoose from "mongoose";

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema({ timestamps: true, versionKey: false })
export class Appointment {
    @Prop(
        raw({
            default: () => new Date(Date.now() + Number.parseInt(process.env.TTLSEC) * 1000),
            expires: 0,
            type: Date,
        }),
    )
    expiresAt: Date;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
    user: string;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'Doctor' })
    doctor: string;

    @Prop({ type: Boolean, default: false })
    activate: boolean;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);