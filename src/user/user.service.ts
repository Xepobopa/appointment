import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schema/user.schema";
import { Model } from "mongoose";
import mongoose from "mongoose";
import { UserException } from "../exception/user.exception";
import {UserDto} from "../dto/user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async writeUser(payload: UserDto) {
        return await this.userModel.create(payload);
    }

    async getById(id: string) {
        return this.userModel.findById(new mongoose.Types.ObjectId(id))
            .orFail(new UserException(id));
    }

    async getAllUsers() {
        return this.userModel.find();
    }

    async deleteOne(id: string) {
        return this.userModel.findByIdAndDelete( new mongoose.Types.ObjectId(id))
            .orFail(new Error(`User with id: '${id}' has not found`));
    }
}