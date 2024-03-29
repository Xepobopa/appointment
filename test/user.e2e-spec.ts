import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { UserModule } from "../src/user/user.module";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import * as mongoose from "mongoose";
import { userStub } from "./stub/user.stub";

describe("Users", () => {
  let app: INestApplication;
  let createdId: string;
  let stub: userStub;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, UserModule]
    }).compile();

    app = moduleRef.createNestApplication();
    stub = new userStub("user_user@gmail.com");
    await app.init();
  });

  it("/POST \t user/create", () => {
    return request(app.getHttpServer())
      .post("/user/create")
      .send(stub.get())
      .expect(201)
      .then(({ body }) => {
        createdId = body._id;
        expect(body).toEqual({
          ...stub.get(),
          _id: expect.any(String)
        });
      });
  });

  it("/GET \t getUsers", () => {
    return request(app.getHttpServer())
      .get('/user/get')
      .expect(200)
      .then(({ body }) => {
        expect(body).toContainEqual({
          ...stub.get(),
          _id: createdId
        });
      });
  });

  it("/GET \t getUser/:id", () => {
    return request(app.getHttpServer())
      .get(`/user/get/${createdId}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          ...stub.get(),
          _id: createdId
        });
      });
  });

  it("/DELETE \t getUsers/:id", () => {
    return request(app.getHttpServer())
      .delete(`/user/delete/${createdId}`)
      .then(({ body }) => {
        expect(body).toEqual({
          ...stub.get(),
          _id: createdId
        });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});