import { describe } from "node:test";
import { Test } from "@nestjs/testing";
import { DoctorController } from "../doctor/doctor.controller";
import { DoctorService } from "../doctor/doctor.service";
import { doctorStub } from "./stub/doctor.stub";
import * as mongoose from "mongoose";
import { appointmentStub } from "./stub/appointment.stub";

jest.mock('./stub/doctor.stub')
jest.mock('./stub/appointment.stub')

describe('DoctorController', () => {
    let doctorController: DoctorController;
    let doctorService: DoctorService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [DoctorController],
            providers: [
                {
                    provide: DoctorService,
                    useValue: {
                        create: jest.fn().mockImplementation(() =>
                            Promise.resolve({...doctorStub(), _id: expect.any(mongoose.Types.ObjectId)})
                        ),
                        getAll: jest.fn().mockImplementation(() =>
                            Promise.resolve([{...doctorStub(), _id: expect.any(mongoose.Types.ObjectId)}])
                        ),
                        activate: jest.fn().mockImplementation(() =>
                            Promise.resolve({
                                ...appointmentStub(),
                                _id: expect.any(mongoose.Types.ObjectId),
                                date: expect.any(Date),
                                expiresAt: expect.any(Date)
                            })
                        ),
                        getApptById: jest.fn().mockImplementation(() =>
                            Promise.resolve([{
                                ...appointmentStub(),
                                _id: expect.any(mongoose.Types.ObjectId),
                                date: expect.any(Date),
                                expiresAt: expect.any(Date)
                            }])
                        )
                    }
                }
            ]
        }).compile();

        doctorService = moduleRef.get<DoctorService>(DoctorService);
        doctorController = moduleRef.get<DoctorController>(DoctorController);
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(doctorController).toBeDefined()
    });

    describe('create', () => {
        it('should return a new doctor', () => {
            expect(doctorController.create(doctorStub())).resolves.toEqual({
                ...doctorStub(),
                _id: expect.any(mongoose.Types.ObjectId)
            })
        })
    })

    describe('getAll', () => {
        it('should return all doctors', () => {
            expect(doctorController.getAll()).resolves.toEqual([{
                ...doctorStub(),
                _id: expect.any(mongoose.Types.ObjectId)
            }])
        })
    })

    describe('activate', () => {
        it('should return a new doctor', () => {
            expect(doctorController.activate('640afedb843f6df4db6da45d')).resolves.toEqual({
                ...appointmentStub(),
                _id: expect.any(mongoose.Types.ObjectId),
                date: expect.any(Date),
                expiresAt: expect.any(Date)
            })
        })
    })

    describe('getAppts', () => {
        it('should return all appointments to doctor', () => {
            expect(doctorController.activate('640a24269666a385f51e3554')).resolves.toEqual({
                ...appointmentStub(),
                _id: expect.any(mongoose.Types.ObjectId),
                date: expect.any(Date),
                expiresAt: expect.any(Date)
            })
        })
    })
});