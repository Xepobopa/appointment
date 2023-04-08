import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { DoctorModule } from "../src/doctor/doctor.module";
import { doctorStub } from "./stub/doctor.stub";

describe("Doctors", () => {
  let app: INestApplication;
  let createdId: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DoctorModule]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it("/POST \t doctor/create", () => {
    return request(app.getHttpServer())
      .post("/doctor/create")
      .send(doctorStub())
      .expect(201)
      .then(({ body }) => {
        createdId = body._id;
        expect(body).toEqual({
          ...doctorStub(),
          _id: createdId
        });
      });
  });

  it("/GET \t doctor/get", () => {
    return request(app.getHttpServer())
      .get("/doctor/get")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual([{
          ...doctorStub(),
          _id: createdId
        }]);
      });
  });

  it("/DELETE \t doctor/delete/:id", () => {
    return request(app.getHttpServer())
      .delete(`/doctor/delete/${createdId}`)
      .then(({ body }) => {
        expect(body).toEqual({
          ...doctorStub(),
          _id: createdId
        });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

// { route: { path: '/doctor/create', method: 'post' } },
// { route: { path: '/doctor/get', method: 'get' } },
// { route: { path: '/doctor/delete/:id', method: 'delete' } }