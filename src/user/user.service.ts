import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schema/user.schema";
import { Model } from "mongoose";
import { AppointmentService } from "../appointment/appointment.service";
import mongoose from "mongoose";
import { UserException } from "../exception/user.exception";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async writeUser(payload: User) {
        return (await this.userModel.create(payload)).toObject({ versionKey: false });
    }

    async getById(id: string) {
        console.log(id)
        const a = await this.userModel.findById(new mongoose.Types.ObjectId(id));
        if (!a) {
            throw new UserException(id);
        }
        return a;
    }

    async getAllUsers() {
        return this.userModel.find();
    }

    async deleteOne(id: string) {
        return this.userModel.findByIdAndDelete( new mongoose.Types.ObjectId(id))
    }
}