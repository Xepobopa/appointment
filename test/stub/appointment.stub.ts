export class AppointmentStub  {
    _id: string;
    doctor: string;
    user: string;
    activate: boolean;
    expiresAt: string;
    updatedAt: string;
    createdAt: string;

    constructor() {
        this.activate = false;
    }

    set(object: Partial<AppointmentStub>) {
        Object.assign(this, object);
    }

    get() {
        return {
            _id: this._id,
            doctor: this.doctor,
            user: this.user,
            activate: this.activate,
            expiresAt: this.expiresAt,
            updatedAt: expect.any(String),
            createdAt: this.createdAt,
        }
    }

    appointmentPayload() {
        return { user: this.user, doctor: this.doctor }
    }
}