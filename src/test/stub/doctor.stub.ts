import {Doctor} from "../../schema/doctor.schema";

export const doctorStub = (): Doctor => {
    return {
        type: "doc",
        email: "reid.moreno@example.com",
        name: "Einstein",
        phone: "(198) 255-5611",
        photo_avatar: "https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png",
        spec: "therapist",
        free: true
    }
}