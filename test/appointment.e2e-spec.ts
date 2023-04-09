jest.setTimeout(60000);
import {INestApplication} from "@nestjs/common";
import {Test} from "@nestjs/testing";
import * as request from "supertest";
import {AppModule} from "../src/app.module";
import {DoctorModule} from "../src/doctor/doctor.module";
import {doctorStub} from "./stub/doctor.stub";
import {AppointmentStub} from "./stub/appointment.stub";
import {userStub} from "./stub/user.stub";
import {ConfigModule, ConfigService} from "@nestjs/config";

describe("Appointments", () => {
    let app: INestApplication;
    let config: ConfigService;
    let stub: AppointmentStub;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule, DoctorModule, ConfigModule]
        }).compile();

        app = moduleRef.createNestApplication();
        config = moduleRef.get<ConfigService>(ConfigService);
        stub = new AppointmentStub();
        await app.init();
    });


    it("/POST \t user/create", async () => {
        await request(app.getHttpServer())
            .post("/user/create")
            .send(userStub())
            .then(({body}) => {
                stub.user = body._id;
            });

        await request(app.getHttpServer())
            .post("/doctor/create")
            .send(doctorStub())
            .then(({body}) => {
                stub.doctor = body._id;
            });

        return await request(app.getHttpServer())
            .post("/appointment/create")
            .send(stub.appointmentPayload())
            .expect(201)
            .then(({body}) => {
                stub.set(
                    {
                        _id: body._id,
                        createdAt: body.createdAt,
                        updatedAt: body.createdAt,
                        expiresAt: new Date(new Date(body.createdAt).valueOf() + config.get<number>("TTLSEC") * 1000).toISOString()
                    }
                );
                expect(body).toEqual(stub.get());
            });
    });

    it('/GET \t appointment/get', () => {
        return request(app.getHttpServer())
            .get('/appointment/get')
            .then(({body}) => {
                console.log(body);
                expect(body).toEqual([stub.get()]);
            });
    });

    it('/GET \t appointment/getUserAppts/:id', () => {
        return request(app.getHttpServer())
            .get(`/appointment/getUserAppts/${stub.user}`)
            .then(({body}) => {
                expect(body).toEqual([stub.get()]);
            });
    });

    it('/GET \t appointment/getDoctorAppts/:id', () => {
        return request(app.getHttpServer())
            .get(`/appointment/getDoctorAppts/${stub.doctor}`)
            .then(({body}) => {
                expect(body).toEqual([stub.get()]);
            });
    });

    it('/GET \t appointment/activateAppt/:id', () => {
        return request(app.getHttpServer())
            .get(`/appointment/activateAppt/${stub._id}`)
            .then(({body}) => {
                stub.activate = true;
                expect(body).toEqual(stub.get());
            });
    });

    afterAll(async () => {
        await request(app.getHttpServer()).delete(`/doctor/delete/${stub.doctor}`);
        await request(app.getHttpServer()).delete(`/user/delete/${stub.user}`);
        await app.close();
    });
});

//   { route: { path: '/appointment/create', method: 'post' } },
//   { route: { path: '/appointment/get', method: 'get' } },
//   { route: { path: '/appointment/getUserAppts/:id', method: 'get' } },
//   { route: { path: '/appointment/getDoctorAppts/:id', method: 'get' } },
//   { route: { path: '/appointment/activateAppt/:id', method: 'get' } }