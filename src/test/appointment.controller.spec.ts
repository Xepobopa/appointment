import { describe } from "node:test";
import { Test } from "@nestjs/testing";
import { AppointmentController } from "../appointment/appointment.controller";
import { AppointmentService } from "../appointment/appointment.service";
import { appointmentStub } from "./stub/appointment.stub";
import * as mongoose from "mongoose";
import { Appointment } from "../schema/appointment.schema";

jest.mock('./stub/appointment.stub')

describe('AppointmentController', () => {
    let appointmentController: AppointmentController;
    let appointmentService: AppointmentService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [AppointmentController],
            providers: [
                {
                    provide: AppointmentService,
                    useValue: {
                        create: jest.fn().mockImplementation((appt: Appointment) =>
                            Promise.resolve({ ...appointmentStub(), _id: expect.any(mongoose.Types.ObjectId) })
                        ),
                        getAll: jest.fn().mockImplementation(() =>
                            Promise.resolve([{ ...appointmentStub(), _id: expect.any(mongoose.Types.ObjectId) }])
                        )
                    }
                }
            ]
        }).compile();

        appointmentService = moduleRef.get<AppointmentService>(AppointmentService);
        appointmentController = moduleRef.get<AppointmentController>(AppointmentController);

        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(appointmentController).toBeDefined()
    });

    describe('create', () => {
        it('should return a new appointment', () => {
            expect(appointmentController.create(appointmentStub())).resolves.toEqual({
                ...appointmentStub(),
                _id: expect.any(mongoose.Types.ObjectId)
            });
        });
    });

    describe('getAll', () => {
        it('should return all doctors', () => {
            expect(appointmentController.getAll()).resolves.toEqual([{
                ...appointmentStub(),
                _id: expect.any(mongoose.Types.ObjectId)
            }]);
        });
    });
});