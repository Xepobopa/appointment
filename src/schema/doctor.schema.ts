import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type DoctorDocument = HydratedDocument<Doctor>;

@Schema({ versionKey: false })
export class Doctor {
    @Prop({ type: String, unique: true })
    email: string;

    @Prop({ type: String })
    photo_avatar: string;

    @Prop({ type: String })
    phone: string;

    @Prop({ type: String })
    name: string;

    @Prop({ type: String })
    type: string;

    @Prop({ type: String })
    spec: string;

    @Prop({ type: Boolean })
    free: boolean;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);