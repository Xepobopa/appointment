import {User} from "../../schema/user.schema";

export const userStub = (): User => {
    return {
        type: "user",
        name: "Lorraine Baines",
        email: "jonathan.zamora@example.com",
        phone: "(410) 846-3762",
        photo_avatar: "https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png",
        reg_token: "1234-2121-1221-1211"
    }
}