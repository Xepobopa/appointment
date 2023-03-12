import {Doctor} from "../../schema/doctor.schema";

export const doctorStub = (): Doctor => {
    return {
        type: "doc",
        email: "reid.moreno@example.com",
        name: "Einstein",
        phone: "(198) 255-5611",
        photo_avatar: "https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png",
        reg_token: "1234-2121-1221-1211",
        spec: "therapist",
        free: true
    }
}