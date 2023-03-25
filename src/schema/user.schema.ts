import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {IsEmail, IsNotEmpty, IsPhoneNumber} from "class-validator";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
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
}

export const UserSchema = SchemaFactory.createForClass(User);