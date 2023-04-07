import {User} from "../../src/schema/user.schema";

export const userStub = (): User => {
    return {
        email: "example@gmail.com",
        photo_avatar: "http://a.png",
        phone: "+380972342758",
        name: "dima",
        type: "string"
    }
}