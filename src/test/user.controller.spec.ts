import { describe } from "node:test";
import { UserController } from "../user/user.controller";
import { UserService } from "../user/user.service";
import { Test } from "@nestjs/testing";
import * as mongoose from "mongoose";
import { userStub } from "./stub/user.stub";
import { appointmentStub } from "./stub/appointment.stub";

jest.mock('./stub/user.stub')
jest.mock('./stub/appointment.stub')

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        writeUser: jest.fn().mockResolvedValue([
                            {...userStub(), _id: expect.any(mongoose.Types.ObjectId)}
                        ]),
                        getAll: jest.fn().mockImplementation(() =>
                            Promise.resolve([
                                {...userStub(), _id: expect.any(mongoose.Types.ObjectId)}
                            ])
                        ),
                        getAppt: jest.fn().mockImplementation((id: string) =>
                            Promise.resolve({
                                ...appointmentStub(),
                                _id: expect.any(mongoose.Types.ObjectId),
                                date: expect.any(Date),
                                expiresAt: expect.any(Date)
                            })
                        )
                    }
                }
            ]
        }).compile();

        userService = moduleRef.get<UserService>(UserService);
        userController = moduleRef.get<UserController>(UserController);
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(userController).toBeDefined();
    });

    describe('writeUser', () => {
        it('should return a new user', () => {
            expect(userController.writeUser(userStub())).resolves.toEqual([{
                ...userStub(),
                _id: expect.any(mongoose.Types.ObjectId)
            }])
        })
    })
    describe('getAll', () => {
        it('should return a user by id', () => {
            expect(userController.getAll()).resolves.toEqual([{
                ...userStub(),
                _id: expect.any(mongoose.Types.ObjectId)
            }])
        })
    })
    describe('getAppt', () => {
        it('should return an appointment by id', () => {
            expect(userController.getAppt('640afedb843f6df4db6da45d')).resolves.toEqual({
                ...appointmentStub(),
                _id: expect.any(mongoose.Types.ObjectId),
                date: expect.any(Date),
                expiresAt: expect.any(Date)
            })
        })
    })

});