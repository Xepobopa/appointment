import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ type: String, default: 'harry.sutton@example.com' })
    email: string;

    @Prop({ type: String })
    reg_token: string;

    @Prop({ type: String })
    photo_avatar: string;

    @Prop({ type: String, default: '(743) 805-2841' })
    phone: string;

    @Prop({ type: String, default: 'Summer Smith' })
    name: string;

    @Prop({ type: String, default: 'therapist' })
    type: string;

    // @Prop({ type: [String] })
    // appointments: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);