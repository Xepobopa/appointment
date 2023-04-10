import {Doctor} from "../../src/schema/doctor.schema";

export class doctorStub {
    type: string
    email: string
    name: string
    phone: string
    photo_avatar: string
    spec: string
    free: boolean

    constructor(email: string) {
        this.type = "doc"
        this.email = email
        this.name = "Einstein"
        this.phone = "+380972342758"
        this.photo_avatar = "https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png"
        this.spec = "therapist"
        this.free = true
    }

    get() {
        return {
            type: this.type,
            email: this.email,
            name: this.name,
            phone: this.phone,
            photo_avatar: this.photo_avatar,
            spec: this.spec,
            free: this.free
        }
    }
}