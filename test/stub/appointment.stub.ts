import {Appointment} from "../../src/schema/appointment.schema";

export const appointmentStub = (): Appointment => {
    return {
        doctor: "640a24269666a385f51e3554",
        user: "640a23c116fee22175516cce",
        date: new Date(),
        expiresAt: new Date(),
        activate: false
    }
}